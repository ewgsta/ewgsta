import React, { useState, useEffect } from 'react';

import { Octokit } from '@octokit/rest';
import MDEditor from '@uiw/react-md-editor';
import './Admin.css';
import yaml from 'js-yaml';

// Define the repo context. You can also fetch this from environment vars or config
const REPO_OWNER = 'ewgsta';
const REPO_NAME = 'ewgsta';
const BRANCH = 'main';

function Dashboard({ token, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [items, setItems] = useState([]);
  const [overviewData, setOverviewData] = useState({ posts: [], projects: [] });
  const [loading, setLoading] = useState(false);
  
  // Editor state
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const octokit = React.useMemo(() => new Octokit({ auth: token }), [token]);

  const fetchItems = React.useCallback(async (type) => {
    setLoading(true);
    setItems([]);
    
    if (type === 'overview') {
      try {
        const [postsRes, projectsRes] = await Promise.all([
          octokit.rest.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: 'src/content/posts', ref: BRANCH }).catch(() => ({ data: [] })),
          octokit.rest.repos.getContent({ owner: REPO_OWNER, repo: REPO_NAME, path: 'src/content/projects', ref: BRANCH }).catch(() => ({ data: [] }))
        ]);
        const posts = Array.isArray(postsRes.data) ? postsRes.data.filter(f => f.name.endsWith('.md')).reverse() : [];
        const projects = Array.isArray(projectsRes.data) ? projectsRes.data.filter(f => f.name.endsWith('.md')).reverse() : [];
        setOverviewData({ posts, projects });
      } catch (err) {
        console.error("Failed overview", err);
      } finally {
        setLoading(false);
      }
      return;
    }
    
    if (type === 'settings') {
      try {
        const { data } = await octokit.rest.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: 'src/content/site/config.yaml',
          ref: BRANCH
        });
        const content = decodeURIComponent(escape(atob(data.content)));
        const configData = yaml.load(content) || {};
        setEditingItem({
          path: 'src/content/site/config.yaml',
          sha: data.sha,
          isNew: false,
          frontmatter: configData,
          body: ''
        });
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
      return;
    }
    
    try {
      const path = type === 'posts' ? 'src/content/posts' : 'src/content/projects';
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: path,
        ref: BRANCH
      });
      
      // Keep only .md files
      const mdFiles = Array.isArray(data) ? data.filter(file => file.name.endsWith('.md')) : [];
      setItems(mdFiles.reverse()); // simple reverse to show newest first conceptually
      setCurrentPage(1); // Reset page on tab change
    } catch (err) {
      console.error("Failed to fetch items", err);
    } finally {
      setLoading(false);
    }
  }, [octokit]);

  useEffect(() => {
    if (!editingItem) {
      fetchItems(activeTab);
    }
  }, [activeTab, editingItem, fetchItems]);

  const loadItem = async (item) => {
    setLoading(true);
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: item.path,
        ref: BRANCH
      });

      const content = decodeURIComponent(escape(atob(data.content)));
      // Basic Frontmatter parsing
      const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      
      if (match) {
        const frontmatter = yaml.load(match[1]);
        setEditingItem({
          path: item.path,
          sha: data.sha,
          isNew: false,
          frontmatter: frontmatter || {},
          body: match[2] || ''
        });
      } else {
        // No frontmatter found
        setEditingItem({
          path: item.path,
          sha: data.sha,
          isNew: false,
          frontmatter: {},
          body: content
        });
      }
    } catch (err) {
      console.error("Failed to load item", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = (targetTab = activeTab) => {
    setActiveTab(targetTab);
    const isPost = targetTab === 'posts';
    const dateStr = new Date().toISOString().split('T')[0];
    
    setEditingItem({
      path: `src/content/${targetTab}/${dateStr}-new-entry.md`,
      sha: null,
      isNew: true,
      frontmatter: isPost ? {
        title: 'New Post',
        description: '',
        date: new Date().toISOString(),
        layout: 'blog',
        thumbnail: ''
      } : {
        title: 'New Project',
        description: '',
        link: '',
        tech: [],
        featured: false
      },
      body: 'Write your content here...'
    });
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);
    try {
      let fileContent = '';
      
      if (activeTab === 'settings') {
        fileContent = yaml.dump(editingItem.frontmatter);
      } else {
        // Reconstruct Markdown with Frontmatter
        const yamlStr = Object.keys(editingItem.frontmatter).length > 0 ? yaml.dump(editingItem.frontmatter) : '';
        fileContent = `---\n${yamlStr}---\n${editingItem.body}`;
      }
      
      const commitMessage = editingItem.isNew 
        ? `Create ${editingItem.frontmatter.title || 'new item'}`
        : `Update ${activeTab === 'settings' ? 'site config' : (editingItem.frontmatter.title || 'item')}`;

      const params = {
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: editingItem.path,
        message: commitMessage,
        content: btoa(unescape(encodeURIComponent(fileContent))), // Handle utf-8 encoding properly for base64
        branch: BRANCH
      };

      if (!editingItem.isNew && editingItem.sha) {
        params.sha = editingItem.sha;
      }

      const response = await octokit.rest.repos.createOrUpdateFileContents(params);
      
      if (activeTab === 'settings') {
         // Update SHA to prevent conflict on subsequent saves
         setEditingItem(prev => ({...prev, sha: response.data.content.sha}));
      } else {
         // Go back to list
         setEditingItem(null);
      }
    } catch (err) {
      console.error("Failed to save", err);
      alert("Error saving document. Check console.");
    } finally {
      setSaving(false);
    }
  };

  const updateFrontmatter = (key, value) => {
    setEditingItem(prev => {
      const updated = { ...prev, frontmatter: { ...prev.frontmatter, [key]: value } };
      
      // Auto-generate slug and path for new items based on title
      if (prev.isNew && (key === 'title' || key === 'date')) {
        const title = updated.frontmatter.title || 'new-entry';
        
        // Convert turkish chars to english equivalents and generate slug
        const charMap = { 'ğ':'g', 'ü':'u', 'ş':'s', 'ı':'i', 'ö':'o', 'ç':'c', 'Ğ':'G', 'Ü':'U', 'Ş':'S', 'İ':'I', 'Ö':'O', 'Ç':'C' };
        const slug = title.replace(/[ğüşıöçĞÜŞİÖÇ]/g, match => charMap[match] || match)
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                          
        const dateStr = updated.frontmatter.date ? String(updated.frontmatter.date).split('T')[0] : new Date().toISOString().split('T')[0];
        
        updated.path = activeTab === 'posts' 
          ? `src/content/posts/${dateStr}-${slug}.md`
          : `src/content/projects/${slug}.md`;
      }
      
      return updated;
    });
  };

  const isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';

  // Pagination calculations
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (editingItem) {
    return (
      <div className="admin-wrapper" data-color-mode={isDarkMode ? "dark" : "light"}>
        <div className="admin-content" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="admin-header">
            <button className="admin-btn admin-btn-ghost" onClick={() => {
              if (activeTab === 'settings') setActiveTab('overview');
              setEditingItem(null);
            }} style={{ width: 'auto' }}>
              <i className="fa-solid fa-arrow-left"></i>
              <span>Back</span>
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                className="admin-btn admin-btn-primary" 
                onClick={handleSave} 
                disabled={saving}
                style={{ width: 'auto' }}
              >
                {saving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-floppy-disk"></i>}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

          <div className="admin-input-group">
            <label>File Path</label>
            <input 
              type="text" 
              className="admin-input" 
              value={editingItem.path} 
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          {activeTab === 'settings' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              {Object.entries(editingItem.frontmatter).map(([key, value]) => {
                if (typeof value === 'object') return null; // Skip arrays/objects for now
                
                // Format camelCase key to capitalized words
                const label = key.replace(/([A-Z])/g, ' $1').trim();
                const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);

                return (
                  <div className="admin-input-group" key={key}>
                    <label>{displayLabel}</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      value={value || ''} 
                      onChange={e => updateFrontmatter(key, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div className="admin-input-group">
                <label>Title</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={editingItem.frontmatter.title || ''} 
                  onChange={e => updateFrontmatter('title', e.target.value)}
                />
              </div>
            
            <div className="admin-input-group">
              <label>Description</label>
              <input 
                type="text" 
                className="admin-input" 
                value={editingItem.frontmatter.description || ''} 
                onChange={e => updateFrontmatter('description', e.target.value)}
              />
            </div>

            {activeTab === 'posts' && (
              <>
                <div className="admin-input-group">
                  <label>Date</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={editingItem.frontmatter.date || ''} 
                    onChange={e => updateFrontmatter('date', e.target.value)}
                  />
                </div>
                <div className="admin-input-group">
                  <label>Thumbnail URL</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={editingItem.frontmatter.thumbnail || ''} 
                    onChange={e => updateFrontmatter('thumbnail', e.target.value)}
                  />
                </div>
              </>
            )}
            
            {activeTab === 'projects' && (
              <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                <label>Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={(editingItem.frontmatter.tech || []).join(', ')} 
                  onChange={e => updateFrontmatter('tech', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                />
              </div>
            )}
          </div>
          )}

          {activeTab !== 'settings' && (
            <div style={{ marginTop: '30px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '10px' }}>
                Content
              </label>
              <MDEditor
                value={editingItem.body}
                onChange={(val) => setEditingItem({...editingItem, body: val})}
                height={500}
                preview="edit"
                hideToolbar={false}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="https://github.com/ewgsta.png" alt="Logo" style={{ width: 22, height: 22, borderRadius: '4px' }} />
          <span>E-CMS</span>
        </div>

        <ul className="admin-nav-list">
          <li className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setEditingItem(null); }}>
            <i className="fa-solid fa-house"></i>
            <span>Overview</span>
          </li>
          <li className={`admin-nav-item ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => { setActiveTab('posts'); setEditingItem(null); }}>
            <i className="fa-solid fa-file-lines"></i>
            <span>Posts</span>
          </li>
          <li className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setEditingItem(null); }}>
            <i className="fa-solid fa-folder-open"></i>
            <span>Projects</span>
          </li>
          <li className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setEditingItem(null); }}>
            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>
          </li>
        </ul>

        <div style={{ marginTop: 'auto' }}>
          <button className="admin-btn admin-btn-ghost" onClick={onLogout} style={{ justifyContent: 'flex-start' }}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' ? (
          <>
            <div className="admin-header">
              <h2>Overview</h2>
            </div>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading overview...</div>
            ) : (
              <div style={{ maxWidth: '720px' }}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Blog Posts
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '13px' }}>{overviewData.posts.length} total</span>
                    </h3>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="admin-btn admin-btn-ghost" onClick={() => setActiveTab('posts')} style={{ height: '28px', padding: '0 10px', fontSize: '13px' }}>View All</button>
                      <button className="admin-btn admin-btn-ghost" onClick={() => handleCreateNew('posts')} style={{ height: '28px', padding: '0 10px', fontSize: '13px' }}>
                        <i className="fa-solid fa-plus"></i> New
                      </button>
                    </div>
                  </div>
                  <div className="admin-list">
                    {overviewData.posts.slice(0, 3).map(item => (
                      <div key={item.sha} className="admin-list-item" onClick={() => { setActiveTab('posts'); loadItem(item); }}>
                        <div className="admin-item-title" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fa-regular fa-file-lines" style={{ color: 'var(--text-muted)', fontSize: '13px', width: '14px' }}></i>
                          {item.name.replace('.md', '')}
                        </div>
                      </div>
                    ))}
                    {overviewData.posts.length === 0 && <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '8px' }}>No posts yet.</div>}
                  </div>
                </div>

                <div style={{ marginBottom: '48px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Projects
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '13px' }}>{overviewData.projects.length} total</span>
                    </h3>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="admin-btn admin-btn-ghost" onClick={() => setActiveTab('projects')} style={{ height: '28px', padding: '0 10px', fontSize: '13px' }}>View All</button>
                      <button className="admin-btn admin-btn-ghost" onClick={() => handleCreateNew('projects')} style={{ height: '28px', padding: '0 10px', fontSize: '13px' }}>
                        <i className="fa-solid fa-plus"></i> New
                      </button>
                    </div>
                  </div>
                  <div className="admin-list">
                    {overviewData.projects.slice(0, 3).map(item => (
                      <div key={item.sha} className="admin-list-item" onClick={() => { setActiveTab('projects'); loadItem(item); }}>
                        <div className="admin-item-title" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fa-regular fa-file" style={{ color: 'var(--text-muted)', fontSize: '13px', width: '14px' }}></i>
                          {item.name.replace('.md', '')}
                        </div>
                      </div>
                    ))}
                    {overviewData.projects.length === 0 && <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '8px' }}>No projects yet.</div>}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="admin-header">
              <h2>{activeTab === 'posts' ? 'Blog Posts' : 'Projects'}</h2>
              <button className="admin-btn admin-btn-primary" onClick={() => handleCreateNew(activeTab)} style={{ width: 'auto' }}>
                <i className="fa-solid fa-plus"></i>
                <span>New {activeTab === 'posts' ? 'Post' : 'Project'}</span>
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading items...</div>
            ) : (
              <div className="admin-list">
                {currentItems.map(item => (
                  <div key={item.sha} className="admin-list-item" onClick={() => loadItem(item)}>
                    <div className="admin-item-title">{item.name.replace('.md', '')}</div>
                    <div className="admin-item-meta">{item.size} bytes</div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No items found. Create your first one!
                  </div>
                )}
                
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button 
                      className="admin-btn admin-btn-ghost" 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{ opacity: currentPage === 1 ? 0.3 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      <i className="fa-solid fa-chevron-left"></i> Previous
                    </button>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Page {currentPage} of {totalPages}</span>
                    <button 
                      className="admin-btn admin-btn-ghost" 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{ opacity: currentPage === totalPages ? 0.3 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                      Next <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

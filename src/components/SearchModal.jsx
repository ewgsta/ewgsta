
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { getAllSearchableContent } from '../utils/searchData';
import { useTheme } from '../context/ThemeContext';

export default function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    // Load data once
    useEffect(() => {
        getAllSearchableContent().then(setData);
    }, []);

    // Initialize Fuse
    const fuse = useMemo(() => new Fuse(data, {
        keys: [
            { name: 'title', weight: 0.7 },
            { name: 'description', weight: 0.2 },
            { name: 'content', weight: 0.1 }
        ],
        threshold: 0.4,
        ignoreLocation: true,
    }), [data]);

    // Handle Search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const searchResults = fuse.search(query).map(r => r.item);
        setResults(searchResults.slice(0, 5)); // Limit to 5 results
        setSelectedIndex(0);
    }, [query, fuse]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Toggle with Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }

            if (!isOpen) return;

            if (e.key === 'Escape') {
                setIsOpen(false);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    handleSelect(results[selectedIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery('');
            setResults([]);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleSelect = (item) => {
        setIsOpen(false);
        if (item.type === 'post') {
            navigate(`/posts/${item.slug}`);
        } else if (item.type === 'project') {
            navigate(`/projects`); // Or specific project page if exists
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="search-modal-content" onClick={e => e.stopPropagation()}>
                <div className="search-input-wrapper">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search posts and projects..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <div className="search-badge">ESC</div>
                </div>

                {results.length > 0 ? (
                    <ul className="search-results-list">
                        {results.map((item, index) => (
                            <li
                                key={index}
                                className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="result-icon">
                                    <i className={`fa-solid ${item.type === 'post' ? 'fa-file-lines' : 'fa-code'}`}></i>
                                </div>
                                <div className="result-info">
                                    <div className="result-title">
                                        {item.title}
                                        <span className="result-type-badge">{item.type}</span>
                                    </div>
                                    {item.description && <div className="result-desc">{item.description}</div>}
                                </div>
                                {index === selectedIndex && <i className="fa-solid fa-arrow-right result-enter-icon"></i>}
                            </li>
                        ))}
                    </ul>
                ) : query && (
                    <div className="search-no-results">
                        No results found for "{query}"
                    </div>
                )}

                {!query && (
                    <div className="search-empty-state">
                        <p>Type to start searching...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

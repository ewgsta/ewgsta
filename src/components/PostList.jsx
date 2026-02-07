import PostItem from './PostItem';
import SectionHeader from './SectionHeader';
import { Link } from 'react-router-dom';
import { postsLabel, readMoreLabel } from '../data/siteData';

const PostList = ({ posts }) => {
    return (
        <section>
            <SectionHeader title={postsLabel} />
            <ul className="post-list">
                {posts.map((post, index) => (
                    <PostItem key={index} date={post.date} title={post.title} slug={post.slug} />
                ))}
            </ul>
            <Link to="/posts" className="read-more-link">{readMoreLabel} →</Link>
        </section>
    );
};

export default PostList;

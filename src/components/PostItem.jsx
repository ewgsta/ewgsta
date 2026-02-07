import { Link } from 'react-router-dom';
import { postsSlug } from '../data/siteData';

const PostItem = ({ date, title, slug }) => {
    return (
        <li className="post-item">
            <span className="post-date">{date}</span>
            {slug ? (
                <Link to={`/${postsSlug}/${slug}`} className="post-title">{title}</Link>
            ) : (
                <a href="#" className="post-title">{title}</a>
            )}
        </li>
    );
};

export default PostItem;

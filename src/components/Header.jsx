import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useSearch } from '../context/SearchContext.jsx';
import { logoUrl, logoText } from '../data/siteData';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { openSearch } = useSearch();

    return (
        <header>
            <div className="brand-group">
                <div className="logo-img">
                    <Link to="/">
                        <img src={logoUrl} alt="Logo" />
                    </Link>
                </div>
                <div className="brand-info">
                    <h1>{logoText}</h1>
                </div>
            </div>

            <div className="header-icons">
                <i className="fa-solid fa-magnifying-glass" onClick={openSearch} style={{ cursor: 'pointer' }}></i>
                <i
                    className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}
                    onClick={toggleTheme}
                    style={{ cursor: 'pointer' }}
                ></i>
                {/* Language icon removed as requested */}
            </div>
        </header>
    );
};

export default Header;

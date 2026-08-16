import { Link } from 'react-router-dom';
import { Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';
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
                <button onClick={openSearch} aria-label="Search">
                    <Search size={16} />
                </button>
                <button onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
            </div>
        </header>
    );
};

export default Header;

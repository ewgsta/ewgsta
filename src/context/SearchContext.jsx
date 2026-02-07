import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);
    const toggleSearch = () => setIsSearchOpen(prev => !prev);

    return (
        <SearchContext.Provider value={{ isSearchOpen, openSearch, closeSearch, toggleSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}

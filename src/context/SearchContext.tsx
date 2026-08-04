import React, { createContext, useContext, useState } from 'react';

interface SearchContextValue {
    isSearchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
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

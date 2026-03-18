import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('crm_theme');
        setDark(saved !== 'light');
    }, []);

    const toggle = () => {
        setDark(prev => {
            const next = !prev;
            localStorage.setItem('crm_theme', next ? 'dark' : 'light');
            return next;
        });
    };

    useEffect(() => {
        document.body.classList.toggle('light', !dark);
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

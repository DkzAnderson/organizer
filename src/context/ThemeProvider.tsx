import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Verificar el tema guardado en local storage al iniciar
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const [theme, setTheme] = useState<Theme>(storedTheme || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // Guardar el tema en el local storage
        localStorage.setItem("theme", newTheme);

        // Cambiar la clase del documento según el tema
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    // Efecto para aplicar el tema al iniciar según lo que hay en local storage
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('Error de contexto');
    }
    return context;
};

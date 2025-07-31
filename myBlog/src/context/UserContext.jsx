// Importación de hooks
import { createContext, useState, useContext, useEffect } from 'react';
// Se asigna un nombre a la función que crea el contexto
const UserContext = createContext();

// Se crea el Provider para envolver la App y compartir un estado global con children
export const UserProvider = ({ children }) => {
    // Se inicializa el estado de user como nulo
    const [user, setUser] = useState(null);
    // Se inicializa el estado de carga como true 
    const [isLoading, setIsLoading] = useState(true);

    // Efecto que recupera el usuario de la memoria local al existir un inicio de sesión, actualizando el estado user, y modifica el estado de carga a false
    // Permite guardar la información de forma temporal mientras exista la sesión. Si no hay sesión, se borra.
    useEffect(() =>{
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // Función que maneja el inicio de sesión y lo actualiza en el estado 
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    // Función que maneja el cierre de sesión y lo actualiza en el estado
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    return(
        <UserContext.Provider value={{ user, login, logout, isLoading }}>
          {/* Se crea la estructura del Provider */}
            {children}
        </UserContext.Provider>
    )
};

// Buena practica para evitar poner de nuevo useContext al consumir el contexto

/* La siguiente línea de texto omite errores sintácticos al permitirlos como válidos */

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

// Importación de hooks
import { createContext, useState, useContext, useEffect } from 'react';

// Se asigna un nombre a la función que crea el contexto
const UserContext = createContext();

// Se crea el Provider para envolver la App y compartir un estado global con children
export function UserProvider({ children }){
    // Se inicializa el estado de user como nulo
    const [user, setUser] = useState(null);

    // Se crea una variable login que actualiza el estado de user con los datos de inicio de sesión. 
    // Guarda nombre y el valor de password como un objeto

    // Nos ayuda a guardar la información de forma temporal mientras exista la sesión. Si no hay sesión, se borra
    useEffect(() =>{
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return(
        <UserContext.Provider value={{user, login, logout}}>
          {/* Se crea la estructura del Provider */}
            {children}
        </UserContext.Provider>
    )
}

// Buena practica para evitar poner de nuevo useContext al consumir el contexto

/* La siguiente línea de texto omite errores sintácticos al permitirlos como válidos */

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

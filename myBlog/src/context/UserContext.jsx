import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }){
    const [user, setUser] = useState(null);

    const login = (name, password) => setUser({name, password});
    // Guarda nombre y el valor de password como un objeto
    const logout = () => setUser(null);

    return(
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}

// Buena practica para evitar poner de nuevo useContext
// eslint-disable-next-line react-refresh/only-export-components
export function useUser(){
    return useContext(UserContext);
}
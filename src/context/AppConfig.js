import React, { useState, createContext } from 'react';
import { useEffect } from 'react';

export const AppConfig = createContext();

export const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState("")

    return (
        <AppConfig.Provider value={{
            users, currentUser, setCurrentUser, setUsers
        }}>
            {children}
        </AppConfig.Provider>
    )
}
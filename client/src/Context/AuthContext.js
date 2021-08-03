import React, { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [urlServer, setUrlServer] = useState('http://localhost:3001')

    //dati utente
    const [user, setUser] = useState()

    return <AuthContext.Provider value={
        {
            urlServer,
            user,
            setUser
        }
    }>{children}</AuthContext.Provider>
}

export default AuthContext;
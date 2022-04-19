import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const urlServer = 'http://localhost:4001'
    //const urlServer = 'https://roiti.herokuapp.com'

    //dati utente
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        axios.post(`${urlServer}/user-id`, {id: Cookies.get('token')}).then(res => {
            setUser(res.data[0])

            console.log(res.data[0])
        })
    }, [])

    return <AuthContext.Provider value={
        {
            urlServer,
            user,
            setUser
        }
    }>{children}</AuthContext.Provider>
}

export default AuthContext;
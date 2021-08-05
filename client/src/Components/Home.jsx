import React, { useEffect } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import './Home.css'
import { Button as RButton } from 'rsuite'

export default function Home() {

    useEffect(() => {
        console.log(Cookies.get('token'))
    }, [])

    return (
        <div>
            <Header />
            <h1 id="name">Roiti Informatica</h1>
            <h3 id="scritta1">Portale di allenamento per il potenziamento di informatica</h3>
            <h5 id="scritta2">Benvenuto/a nella piattaforma ufficiale del Roiti per informatica!
                Qui avrai accesso a numerosi problemi con cui affinare le tue capacità di problem-solving.</h5>

            <Link to="/articoli"><RButton appearance="primary" id="btnHomeArticoli">Articoli</RButton></Link>
            <Link to="#"><RButton appearance="primary" id="btnHomeProblemi">Problemi consigliati</RButton></Link>
            <Link to="#"><RButton appearance="primary" id="btnHomeStudio">Materiale per studiare</RButton></Link>
            
        </div>
    )
}

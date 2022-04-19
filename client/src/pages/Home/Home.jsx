import React, { useState } from 'react'
import { FlexboxGrid } from 'rsuite'
import { Link } from 'react-router-dom'

import './Home.css'
import Carousel from './Carousel'

import Header from 'components/Header'
import Footer from 'components/Footer'

import imgArticoli from 'img/IMG_1346.png'
import imgProblemi from 'img/IMG_1347.png'
import imgStudio from 'img/IMG_1348.png'

export default function Home() 
{
    /*
    Home del sito:
    - Header (Header.jsx)
    - Tre pulsanti per navigare in:
        - Articoli
        - Problemi Consigliati
        - Materiale per lo Studio
    - Preview degli articoli (Carousel.jsx)
    - Footer
    */
    const [winSiz, setWinSiz] = useState(window.innerWidth);

    function resize() {
        setWinSiz(window.innerWidth)
    }

    window.addEventListener('resize', resize)

    let buttons =  [<Link to="/articoli">
                        <button className="btnPrincipali" style={{ marginLeft: "70px" }}>
                            <img src={imgArticoli} id="imgArticoli" />
                        </button>
                    </Link>,
                    <Link to="/">
                        <button className="btnPrincipali">
                            <img src={imgProblemi} id="imgProblemi" />
                        </button>
                    </Link>,
                    <Link to="/">
                        <button className="btnPrincipali btnPrincipali3">
                            <img src={imgStudio} id="imgStudio" />
                        </button>
                    </Link>
                    ]

    return (
        <div>
            <Header />
            {
                (winSiz > 825) ? <FlexboxGrid justify="center" style={{ marginTop: "40px", marginBottom: "80px", border: "1px solid black", paddingBottom: "30px", overflow: "hidden" }}>
                    {buttons}
                </FlexboxGrid>
                : <div style={{ marginTop: "60px", marginBottom: "60px"}}>
                    {buttons}
                </div>
            }
            <Carousel />
            <Footer />
        </div>
    )
}

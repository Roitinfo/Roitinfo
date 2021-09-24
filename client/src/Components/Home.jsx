import React, { useEffect } from 'react'
import Header from './Header'
import Carousel from './Carousel'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import './Home.css'
import { Button as RButton, FlexboxGrid } from 'rsuite'

import imgArticoli from '../img/IMG_1346.png'
import imgProblemi from '../img/IMG_1347.png'
import imgStudio from '../img/IMG_1348.png'

export default function Home() {

    useEffect(() => {
        console.log(Cookies.get('token'))
    }, [])

    return (
        <div>
            <Header />

            <FlexboxGrid justify="center" style={{ marginTop: "40px", marginBottom: "80px" }}>
                <Link to="/articoli">
                    <button className="btnPrincipali">
                        <img src={imgArticoli} style={{ width: "300px", height: "320px" }} />
                    </button>
                </Link>


                <div style={{ position: "relative", top: "70px" }}>
                    <Link to="/">
                        <button className="btnPrincipali">
                            <img src={imgProblemi} style={{ width: "350px", height: "250px" }} />
                        </button>
                    </Link>
                </div>


                <div style={{ position: "relative", top: "40px" }}>
                    <Link to="/">
                        <button className="btnPrincipali">
                            <img src={imgStudio} style={{ width: "300px", height: "280px" }} />
                        </button>
                    </Link>
                </div>
            </FlexboxGrid>

            <Carousel />
            <Footer />
        </div>
    )
}

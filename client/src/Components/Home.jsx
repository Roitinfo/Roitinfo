import React, { useEffect, useState } from 'react'
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

    const [winSiz, setWinSiz] = useState(window.innerWidth);

    function resize() {
        setWinSiz(window.innerWidth)
    }

    window.addEventListener('resize', resize)

    return (
        <div>
            <Header />

            {
                winSiz > 825 ? <FlexboxGrid justify="center" style={{ marginTop: "40px", marginBottom: "80px", border: "1px solid black", paddingBottom: "30px", overflow: "hidden" }}>
                    <Link to="/articoli">
                        <button className="btnPrincipali" style={{ marginLeft: "70px" }}>
                            <img src={imgArticoli} id="imgArticoli" />
                        </button>
                    </Link>


                    <div style={{ position: "relative", top: "70px" }} className='btnPrincipali2'>
                        <Link to="/">
                            <button className="btnPrincipali">
                                <img src={imgProblemi} id="imgProblemi" />
                            </button>
                        </Link>
                    </div>


                    <div id="btnImgMateriale" className='btnPrincipali3'>
                        <Link to="/">
                            <button className="btnPrincipali btnPrincipali3">
                                <img src={imgStudio} id="imgStudio" />
                            </button>
                        </Link>
                    </div>
                </FlexboxGrid>
                    : <div style={{ marginTop: "60px", marginBottom: "60px"}}>
                        <FlexboxGrid justify='center'>
                            <Link to="/articoli">
                                <button className="secondiPrincipali">
                                    <img src={imgArticoli} id="imgArticoli" />
                                </button>
                            </Link>
                        </FlexboxGrid>

                        <FlexboxGrid justify='center'>
                            <div style={{ position: "relative", top: "70px" }}>
                                <Link to="/">
                                    <button className="secondiPrincipali">
                                        <img src={imgProblemi} id="imgProblemi" />
                                    </button>
                                </Link>
                            </div>
                        </FlexboxGrid>

                        <FlexboxGrid justify='center'>
                            <div id="btnImgMateriale" style={{ marginTop: "80px" }}>
                                <Link to="/">
                                    <button className="secondiPrincipali" style={{ marginTop: "50px" }}>
                                        <img src={imgStudio} id="imgStudio" />
                                    </button>
                                </Link>
                            </div>
                        </FlexboxGrid>
                    </div>
            }

            <Carousel />
            <Footer />
        </div>
    )
}

import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import Cookie from 'js-cookie'
import classNames from 'classnames'

import './Header.css'
import { Button, FlexboxGrid, Modal, Input, Alert, Checkbox } from 'rsuite'

import Menu from '../img/IMG_1340.png'
import Logo from '../img/IMG_1343.png'
import BtnLogin from '../img/logIn.png'
import nomeSito from '../img/IMG_1377.png'
import descrizioneSito from '../img/IMG_1376.png'
import scrittaLogin from '../img/IMG_1419.png'
import scrittaRegistrazione from '../img/Untitled_Artwork-18.png'
import imgClose from '../img/IMG_1425.png'
import backgroundInput from '../img/IMG_1417.png'
import imgEmail from '../img/IMG_1418.png'
import imgPassword from '../img/IMG_1416.png'
import imgAccount from '../img/IMG_1420.png'
import btnRegistrati from '../img/Untitled_Artwork-3.png'
import btnFreccia from '../img/Untitled_Artwork-1.png'
import imgName from '../img/Untitled_Artwork-10.png'
import imgSurname from '../img/Untitled_Artwork-8.png'
import imgConfermaPassword from '../img/Untitled_Artwork-2.png'
import scrittaAdmin from '../img/Untitled_Artwork-41.png'
import backgroundAdmin from '../img/Untitled_Artwork-42.png'
import imgAdmin from '../img/Untitled_Artwork-44.png'
import casellaAdmin from '../img/Untitled_Artwork-43.png'
import btnProfilo from '../img/Untitled_Artwork (1).png'
import LoginModal from './Login'
import RegisterModal from './Register'

export default function Header() 
{
    /*
    Header del sito:
    - logo del Roiti
    - Pulsante per effettuare il login
    - Pulsante per navigare alla pagina del profilo
    - Informazioni aggiuntive nella home
    */
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    const location = useLocation()

    return (
        <div id="header">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/">
                    <img src={Logo} id="imgLogo" />
                </Link>
            </div>

            <FlexboxGrid justify='right' id="boxLoginSiz" style={{ border: "1px solid orange", padding: "0px" }}>
                {
                    Cookie.get('token') ? <Link to="/profile" id="btnProfilo">
                        <img src={btnProfilo} />
                    </Link>
                        : <button style={{marginRight: "10%", padding: "0px", background: "none"}} onClick={() => setShowModal1(true)}>
                            <img src={BtnLogin} id="imgLogin" />
                        </button>
                }
            </FlexboxGrid>

            {
                location.pathname === '/' ? <div>
                    <FlexboxGrid justify="center">
                        <p id="roitiInformatica">Roiti informatica</p>
                    </FlexboxGrid>

                    <FlexboxGrid justify="center" style={{ marginTop: "-40px" }}>
                        <p id="scrittaSottoRoiti">PORTALE DI ALLENAMENTO E POTENZIAMENTO INFORMATICO</p>
                    </FlexboxGrid>
                </div> : ''
            }

            {/* Modal per il login */}
            {showModal1 ? <LoginModal onHide = {() => setShowModal1(false)} onRegister = {() => {setShowModal1(false); setShowModal2(true)}}></LoginModal> : null}

            {/* Modal per la registrazione */}
            {showModal2 ? <RegisterModal onHide = {() => setShowModal2(false)} ></RegisterModal> : null}
        </div>
    )
}

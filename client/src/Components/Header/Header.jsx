import React, { useState , useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Cookie from 'js-cookie'

import './Header.css'
import { FlexboxGrid } from 'rsuite'

import Logo from '../../img/IMG_1343.png'
import BtnLogin from '../../img/logIn.png'
import btnProfilo from '../../img/Untitled_Artwork (1).png'
import LoginModal from './Login'
import RegisterModal from './Register'
import AuthContext from "../../Context/AuthContext"

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
    const {user} = useContext(AuthContext);
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
                    user ? <Link to="/profile" id="btnProfilo">
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

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

export default function Header() 
{
    /*
    Header del sito:
    - logo del Roiti
    - Pulsante per effettuare il login
    - Pulsante per navigare alla pagina del profilo
    - Informazioni aggiuntive nella home (!??)
    Bug:
    - login admin buggato
    - vulnerabilità (controllo password effettuato lato client)
    */
    const { urlServer, setUser } = useContext(AuthContext)

    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [controlloPsw, setControlloPsw] = useState('')
    const [passwordAdmin, setPasswordAdmin] = useState('')
    const [admin, setAdmin] = useState('')

    const location = useLocation()

    const login = () => {
        setLoading(true)

        axios.post(`${urlServer}/login`, { email, password }).then(res => {
            setLoading(false)

            if (res.data) {
                setShowModal1(false)
                reset()

                Cookie.set('token', res.data._id)

                setUser(res.data)
            } else {
                Alert.error("Email o password sbagliati")
            }
        })
    }

    const register = () => {
        setLoading(true)

        if (name === '' || surname === '' || email === '' || password === '' || controlloPsw === '') {
            setLoading(false)
            Alert.error("Completare tutti i campi")

            return
        }

        if (password !== controlloPsw) {
            setLoading(false)
            Alert.error('Le passoword sono diverse')

            return
        }

        let controlloAdmin = false

        if (admin) {
            if (passwordAdmin !== '1234') {
                setLoading(false)
                Alert.error('Password amministratore errata')

                return
            } else {
                controlloAdmin = true
            }
        }

        axios.post(`${urlServer}/register/controllo-utente`, { email }).then(result => {
            console.log(result.data)
            if (result.data) {
                axios.post(`${urlServer}/register`, { name, surname, email, password, admin: controlloAdmin }).then(res => {
                    console.log(res.data)
                    setUser(res.data)

                    Cookie.set("token", res.data._id)

                    setShowModal2(false)
                    reset()
                })
            } else {
                Alert.error("Utente già esistente")
                setLoading(false)
            }
        })
    }

    const reset = () => {
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
        setControlloPsw('')
    }

    const [showScrittaName, setShowScrittaName] = useState(false)
    const [showScrittaSurname, setShowScrittaSurname] = useState(false)
    const [showScrittaEmail, setShowScrittaEmail] = useState(false)
    const [showScrittaPass, setShowScrittaPass] = useState(false)
    const [showScrittaConfermaPass, setShowScrittaConfermaPass] = useState(false)
    const [showScrittaAdmin, setShowScrittaAdmin] = useState(false)
    const [showBoxAdmin, setShowBoxAdmin] = useState(true)

    useEffect(() => {
        console.log(showScrittaEmail)
    }, [showScrittaEmail])

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
            <Modal size="xs" show={showModal1} onHide={() => { setShowModal1(false); reset() }}>
                <div style={{ background: "#3f6493", margin: "-25px", borderRadius: "20px", padding: "20px", height: "320px" }}>
                    <Modal.Header closeButton={false} style={{ height: "30px" }}>
                        <Modal.Title><img src={scrittaLogin} style={{ width: "70px", height: "30px" }} /></Modal.Title>
                        <FlexboxGrid justify="end" style={{ marginTop: "-28px" }}>
                            <button style={{ padding: "0px", background: "none" }} onClick={() => { setShowModal1(false); reset() }}>
                                <img src={imgClose} id="imgClose" />
                            </button>
                        </FlexboxGrid>
                    </Modal.Header>
                    <Modal.Body style={{ marginTop: "20px", overflow: "hidden", height: "180px" }}>
                        {/*     INPUT EMAIL LOGIN     */}
                        <div>
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img src={imgEmail} className={classNames({ dontShow: showScrittaEmail })} style={{ width: "55px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input onBlur={() => {
                                if (email === '')
                                    setShowScrittaEmail(false)
                            }} onFocus={() => setShowScrittaEmail(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>


                        {/*     INPUT PASSWORD LOGIN     */}
                        <div style={{ marginTop: "-60px" }}>
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img className={classNames({ dontShow: showScrittaPass })} src={imgPassword} style={{ width: "100px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input type="password" onBlur={() => {
                                if (password === '')
                                    setShowScrittaPass(false)
                            }} onFocus={() => setShowScrittaPass(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <img src={imgAccount} style={{ width: "160px", height: "20px", marginTop: "-110px" }} />

                        <FlexboxGrid justify="start" style={{ marginTop: "-42px", marginBottom: "-20px", height: "35px" }}>
                            <button onClick={() => { setShowModal1(false); setShowModal2(true) }} id="btnRegistrati" style={{ width: "100px", padding: "0px", borderRadius: "20px", position: "relative", zIndex: "1", background: "none", outline: "none" }}>
                                <img src={btnRegistrati} />
                            </button>
                        </FlexboxGrid>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btnInvio" onClick={login} style={{ marginTop: "40px" }}>
                            <img style={{ position: "relative", zIndex: "1" }} src={btnFreccia} />
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>



            {/* Modal per la registrazione */}
            <Modal size="xs" show={showModal2} onHide={() => { setShowModal2(false); reset() }}>
                <div style={{ background: "#3f6493", margin: "-25px", borderRadius: "20px", padding: "20px" }}>
                    <Modal.Header closeButton={false} style={{ height: "30px" }}>

                        <Modal.Title><img src={scrittaRegistrazione} style={{ width: "180px", height: "30px" }} /></Modal.Title>

                        <FlexboxGrid justify="end" style={{ marginTop: "-28px" }}>
                            <button style={{ padding: "0px", background: "none" }} onClick={() => { setShowModal2(false); reset() }}>
                                <img src={imgClose} id="imgClose" />
                            </button>
                        </FlexboxGrid>
                    </Modal.Header>
                    <Modal.Body style={{ marginTop: "20px", overflow: "hidden", height: "320px" }}>

                        {/*     INPUT NAME     */}
                        <div className="sizeBoxInput">
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img src={imgName} className={classNames({ dontShow: showScrittaName })} style={{ width: "62px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input autoComplete="off" onBlur={() => {
                                if (name === '')
                                    setShowScrittaName(false)
                            }} onFocus={() => setShowScrittaName(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={name} onChange={e => setName(e.target.value)} type="text" />
                        </div>

                        {/*     INPUT SURNAME     */}
                        <div className="sizeBoxInput">
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img src={imgSurname} className={classNames({ dontShow: showScrittaSurname })} style={{ width: "100px", height: "24px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input autoComplete="off" onBlur={() => {
                                if (surname === '')
                                    setShowScrittaSurname(false)
                            }} onFocus={() => setShowScrittaSurname(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={surname} onChange={e => setSurname(e.target.value)} type="text" />
                        </div>

                        {/*     INPUT EMAIL LOGIN     */}
                        <div className="sizeBoxInput">
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img src={imgEmail} className={classNames({ dontShow: showScrittaEmail })} style={{ width: "55px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input onBlur={() => {
                                if (email === '')
                                    setShowScrittaEmail(false)
                            }} onFocus={() => setShowScrittaEmail(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={email} onChange={e => setEmail(e.target.value)} type="email" />
                        </div>


                        {/*     INPUT PASSWORD LOGIN     */}
                        <div className="sizeBoxInput">
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img className={classNames({ dontShow: showScrittaPass })} src={imgPassword} style={{ width: "100px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input type="password" onBlur={() => {
                                if (password === '')
                                    setShowScrittaPass(false)
                            }} onFocus={() => setShowScrittaPass(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>


                        {/*     INPUT PASSWORD LOGIN     */}
                        <div className="sizeBoxInput">
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img className={classNames({ dontShow: showScrittaConfermaPass })} src={imgConfermaPassword} style={{ width: "195px", height: "28px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                            <input type="password" onBlur={() => {
                                if (controlloPsw === '')
                                    setShowScrittaConfermaPass(false)
                            }} onFocus={() => setShowScrittaConfermaPass(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={controlloPsw} onChange={e => setControlloPsw(e.target.value)} />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <button onClick={() => setShowBoxAdmin(!showBoxAdmin)} style={{ background: "none", padding: "0px", outline: "none" }}>
                                <img src={casellaAdmin} style={{ width: "20px" }} />
                            </button>
                            <img src={imgAdmin} style={{ width: "60px", marginLeft: "15px" }} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ height: "50px" }}>
                        <div className={classNames({ dontShowDisplay: showBoxAdmin })} style={{ position: "relative", zIndex: "0" }}>
                            <FlexboxGrid justify="start">
                                <img src={backgroundAdmin} style={{ width: "200px" }} />
                            </FlexboxGrid>
                            <FlexboxGrid justify="start">
                                <img src={scrittaAdmin} className={classNames({ dontShow: showScrittaAdmin })} style={{ width: "160px", marginTop: "-30px", marginLeft: "15px", transition: "all 0.3s" }} />
                            </FlexboxGrid>
                            <FlexboxGrid justify="start">
                                <input autoComplete="off" type="password" onBlur={() => {
                                    if (admin === '')
                                        setShowScrittaAdmin(false)
                                }} onFocus={() => setShowScrittaAdmin(true)} style={{ fontSize: "20px", paddingLeft: "20px", marginTop: "-35px", width: "200px", background: "none", outline: "none", border: "none" }} value={admin} onChange={e => setAdmin(e.target.value)} />
                            </FlexboxGrid>
                        </div>

                        <button className="btnInvio" onClick={register} style={{ position: "relative" }}>
                            <img style={{ position: "relative", zIndex: "1" }} src={btnFreccia} />
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    )
}

import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
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
import imgClose from '../img/IMG_1425.png'
import backgroundInput from '../img/IMG_1417.png'
import imgEmail from '../img/IMG_1418.png'
import imgPassword from '../img/IMG_1416.png'
import imgAccount from '../img/IMG_1420.png'
import backgroundRegistrati from '../img/IMG_1421.png'
import imgRegistrati from '../img/IMG_1422.png'
import backgroundFreccia from '../img/IMG_1423.png'
import imgFreccia from '../img/IMG_1424.png'

export default function Header() {

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
    const [admin, setAdmin] = useState(false)

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

    const [showScrittaEmail, setShowScrittaEmail] = useState(false)
    const [showScrittaPass, setShowScrittaPass] = useState(false)

    return (
        <div id="header">
            <button style={{ padding: "0px", background: "none", position: "relative", zIndex: "0", top: "10px" }}>
                <img src={Menu} id="imgMenu" />
            </button>

            <FlexboxGrid justify="center" style={{ position: "relative", zIndex: "1", top: "-25px" }}>
                <Link to="/" id="linkNomeSito"><img src={Logo} id="imgLogo" /></Link>
            </FlexboxGrid>

            <FlexboxGrid justify="end" style={{ position: "relative", zIndex: "2", top: "-35px", height: "0px" }}>
                {
                    Cookie.get('token') ? <Link to="/profile" id="btnProfilo"><Button appearance="primary">Profilo</Button></Link> : <button style={{ background: "none", padding: "0px" }} onClick={() => setShowModal1(true)} id="btnLogin"><img src={BtnLogin} id="imgLogin" /></button>
                }
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <img src={nomeSito} style={{ width: "600px", height: "100px" }} />
            </FlexboxGrid>

            <FlexboxGrid justify="center" style={{ marginTop: "-40px" }}>
                <img src={descrizioneSito} style={{ width: "550px", height: "90px" }} />
            </FlexboxGrid>




            {/* Modal per il login */}
            <Modal size="xs" show={showModal1} onHide={() => { setShowModal1(false); reset() }}>
                <div style={{ background: "#3f6493", margin: "-25px", borderRadius: "20px", padding: "20px" }}>
                    <Modal.Header closeButton={false} style={{ height: "30px" }}>
                        <Modal.Title><img src={scrittaLogin} style={{ width: "70px", height: "30px" }} /></Modal.Title>
                        <FlexboxGrid justify="end" style={{ marginTop: "-28px" }}>
                            <button style={{ padding: "0px", background: "none" }} onClick={() => setShowModal1(false)}>
                                <img src={imgClose} id="imgClose" />
                            </button>
                        </FlexboxGrid>
                    </Modal.Header>
                    <Modal.Body style={{ marginTop: "20px", overflow: "hidden" }}>
                        {/*     INPUT EMAIL LOGIN     */}
                        <div>
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img className={classNames({ scrittaEmail: !showScrittaEmail, dontShow: showScrittaEmail })} src={imgEmail} style={{ width: "55px", height: "20px", marginTop: "-69px", marginLeft: "20px" }} />
                            <input onBlur={() => {
                                if (email === '')
                                    setShowScrittaEmail(false)
                            }} onFocus={() => setShowScrittaEmail(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>


                        {/*     INPUT PASSWORD LOGIN     */}
                        <div style={{ marginTop: "-60px" }}>
                            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                            <img className={classNames({ scrittaPass: !showScrittaPass, dontShow: showScrittaPass })} src={imgPassword} style={{ width: "100px", height: "20px", marginTop: "-69px", marginLeft: "20px" }} />
                            <input type="password" onBlur={() => {
                                if (password === '')
                                    setShowScrittaPass(false)
                            }} onFocus={() => setShowScrittaPass(true)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <img src={imgAccount} style={{ width: "160px", height: "20px", marginTop: "-110px" }} />

                        <FlexboxGrid justify="start" style={{ marginTop: "-42px", marginBottom: "-20px", height: "35px" }}>
                            <button onClick={() => {setShowModal1(false); setShowModal2(true)}} id="btnRegistrati" style={{ width: "100px", padding: "0px", borderRadius: "20px", position: "relative", zIndex: "1", background: "none", outline: "none" }}>
                                <img id="backgroundRegistrati" src={backgroundRegistrati} />
                                <img id="imgRegistrati" src={imgRegistrati} />
                            </button>
                        </FlexboxGrid>
                    </Modal.Body>
                    <Modal.Footer style={{height: "50px"}}>
                        <button className="btnInvio" onClick={login}>
                            <img className="backgroundFreccia" src={backgroundFreccia} />
                            <img className="imgFreccia" src={imgFreccia} />
                        </button>
                    </Modal.Footer>
                </div>
            </Modal>


            {/* Modal per la registrazione */}
            <Modal size="xs" show={showModal2} onHide={() => { setShowModal2(false); reset() }}>
                <Modal.Header>
                    <Modal.Title>Registrati</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={name} onChange={e => setName(e)} placeholder="Nome" />
                    <Input value={surname} onChange={e => setSurname(e)} className="input" placeholder="Cognome" />
                    <Input value={email} onChange={e => setEmail(e)} className="input" placeholder="Email" type="email" />
                    <Input value={password} onChange={e => setPassword(e)} className="inpu" id="inputPsw" placeholder="Password" type="password" />
                    <Input value={controlloPsw} onChange={e => setControlloPsw(e)} className="input" placeholder="Conferma password" type="password" />
                    <Checkbox className="input" onChange={(value, checked) => { setAdmin(checked); checked ? setAdmin(checked) : setPasswordAdmin('') }}> Admin</Checkbox>
                    {
                        admin ? <Input value={passwordAdmin} onChange={e => setPasswordAdmin(e)} className="input" placeholder="Password admin" type="password" /> : ''
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={register} loading={loading} appearance="primary">
                        Registrati
                    </Button>
                    <Button onClick={() => { setShowModal2(false); reset() }} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import Cookie from 'js-cookie'

import './Header.css'
import { Button, FlexboxGrid, Modal, Input, Alert, Checkbox } from 'rsuite'

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

        axios.post(`${urlServer}/login`, {email, password}).then(res => {
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

        axios.post(`${urlServer}/register/controllo-utente`, {email}).then(result => {
            console.log(result.data)
            if (result.data) {
                axios.post(`${urlServer}/register`, {name, surname, email, password, admin: controlloAdmin}).then(res => {
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

    return (
        <div id="header">
            <Link to="/" id="linkNomeSito"><p id="nomeSito">Roitinfo</p></Link>
            <Link to="/articoli"><Button appearance="primary" id="btnArticoli">Articoli</Button></Link>
            <FlexboxGrid justify="end">
                {
                    Cookie.get('token') ? <Link to="/profile" id="btnProfilo"><Button appearance="primary">Profilo</Button></Link> : <Button onClick={() => setShowModal1(true)} appearance="primary" id="btnLogin">Login</Button>
                }
            </FlexboxGrid>


            {/* Modal per il login */}
            <Modal size="xs" show={showModal1} onHide={() => {setShowModal1(false); reset()}}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={email} onChange={e => setEmail(e)} placeholder="Email" />
                    <Input value={password} onChange={e => setPassword(e)} id="inputPsw" placeholder="Password" />
                    <p id="scrittaRegister">Non hai un accoutn? <Button onClick={() => { setShowModal1(false); setShowModal2(true); reset() }} id="btnRegister" appearance="primary">Registrati</Button></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button loading={loading} onClick={login} appearance="primary">
                        Login
                    </Button>
                    <Button onClick={() => {setShowModal1(false); reset()}} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Modal per la registrazione */}
            <Modal size="xs" show={showModal2} onHide={() => {setShowModal2(false); reset()}}>
                <Modal.Header>
                    <Modal.Title>Registrati</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input value={name} onChange={e => setName(e)} placeholder="Nome" />
                    <Input value={surname} onChange={e => setSurname(e)} className="input" placeholder="Cognome" />
                    <Input value={email} onChange={e => setEmail(e)} className="input" placeholder="Email" type="email" />
                    <Input value={password} onChange={e => setPassword(e)} className="inpu" id="inputPsw" placeholder="Password" type="password" />
                    <Input value={controlloPsw} onChange={e => setControlloPsw(e)} className="input" placeholder="Conferma password" type="password" />
                    <Checkbox className="input" onChange={(value, checked) => {setAdmin(checked); checked ? setAdmin(checked) : setPasswordAdmin('')}}> Admin</Checkbox>
                    {
                        admin ? <Input value={passwordAdmin} onChange={e => setPasswordAdmin(e)} className="input" placeholder="Password admin" type="password" /> : ''
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={register} loading={loading} appearance="primary">
                        Registrati
                    </Button>
                    <Button onClick={() => {setShowModal2(false); reset()}} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

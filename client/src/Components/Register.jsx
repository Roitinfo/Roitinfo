import React from 'react'
import { Button, FlexboxGrid, Modal, Input, Alert, Checkbox } from 'rsuite'
import Cookie from 'js-cookie'
import classNames from 'classnames'
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
import AuthContext from '../Context/AuthContext'
import axios from 'axios'

export default class RegisterModal extends React.Component
{
    /*
    Modal per effettuare la registrazione:
    - Campo email
    - Campo password
    - Pulsante per inviare
    - Pulsante per registrarsi
    */
    static contextType = AuthContext
    constructor(props)
    {        
        super(props)
        this.state =
            {
                name: "",
                surname: "",
                email : "",
                password : "",
                passwordCheck : "",
                admin : false,
                adminPassword : "",
            }
    }

    reset()
    {
        this.setState
        ({
            name: "",
            surname: "",
            email : "",
            password : "",
            passwordCheck : "",
            admin : false,
            adminPassword : "",
        })
    }

    register()
    {
        if (this.state.name === '' || this.state.surname === '' || this.state.email === '' || this.state.password === '' || this.state.controlloPsw === '') {
            Alert.error("Completare tutti i campi")

            return
        }

        if (this.state.password !== this.state.passwordCheck) {
            Alert.error('Le passoword sono diverse')

            return
        }

        let controlloAdmin = false

        axios.post(`${this.context.urlServer}/register/controllo-utente`, { email : this.state.email }).then(result => {
            if (result.data) {
                axios.post(`${this.context.urlServer}/register`, this.state).then(res => {
                    if (res.data === false)
                    {
                        Alert.error("Password amministratore errata")
                        return
                    }
                    this.context.setUser(res.data)

                    Cookie.set("token", res.data._id)

                    this.props.onHide()
                })
            } else {
                Alert.error("Utente già esistente")
            }
        })
    }

    render()
    {
        return (
            <Modal size="xs" show={true} onHide={() => this.props.onHide()}>
            <div style={{ background: "#3f6493", margin: "-25px", borderRadius: "20px", padding: "20px" }}>
                <Modal.Header closeButton={false} style={{ height: "30px" }}>
                    <Modal.Title><img src={scrittaRegistrazione} style={{ width: "180px", height: "30px" }} /></Modal.Title>
                    <FlexboxGrid justify="end" style={{ marginTop: "-28px" }}>
                        <button style={{ padding: "0px", background: "none" }} onClick={() => this.props.onHide()}>
                            <img src={imgClose} id="imgClose" />
                        </button>
                    </FlexboxGrid>
                </Modal.Header>
                <Modal.Body style={{ marginTop: "20px", overflow: "hidden", height: "320px" }}>

                    {/*     INPUT NAME     */}
                    <div className="sizeBoxInput">
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img src={imgName} className={classNames({ dontShow: this.state.name !== "" })} style={{ width: "62px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input autoComplete="off" 
                        className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} onChange={e => this.setState({name : e.target.value})} type="text" />
                    </div>

                    {/*     INPUT SURNAME     */}
                    <div className="sizeBoxInput">
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img src={imgSurname} className={classNames({ dontShow: this.state.surname !== "" })} style={{ width: "100px", height: "24px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input autoComplete="off"
                        className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} onChange={e => this.setState({surname : e.target.value})} type="text" />
                    </div>

                    {/*     INPUT EMAIL LOGIN     */}
                    <div className="sizeBoxInput">
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img src={imgEmail} className={classNames({ dontShow: this.state.email !== "" })} style={{ width: "55px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} onChange={e => this.setState({email : e.target.value})} type="email" />
                    </div>


                    {/*     INPUT PASSWORD LOGIN     */}
                    <div className="sizeBoxInput">
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img className={classNames({ dontShow: this.state.password !== "" })} src={imgPassword} style={{ width: "100px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input type="password" className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} onChange={e => this.setState({password : e.target.value})} />
                    </div>


                    {/*     INPUT PASSWORD LOGIN     */}
                    <div className="sizeBoxInput">
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img className={classNames({ dontShow: this.state.passwordCheck !== "" })} src={imgConfermaPassword} style={{ width: "195px", height: "28px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input type="password" className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} onChange={e => this.setState({passwordCheck : e.target.value})} />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <button onClick={() => this.setState({admin : !this.state.admin})} style={{ background: "none", padding: "0px", outline: "none" }}>
                            <img src={casellaAdmin} style={{ width: "20px" }} />
                        </button>
                        <img src={imgAdmin} style={{ width: "60px", marginLeft: "15px" }} />
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ height: "50px" }}>
                    <div className={classNames({ dontShowDisplay: !this.state.admin })} style={{ position: "relative", zIndex: "0" }}>
                        <FlexboxGrid justify="start">
                            <img src={backgroundAdmin} style={{ width: "200px" }} />
                        </FlexboxGrid>
                        <FlexboxGrid justify="start">
                            <img src={scrittaAdmin} className={classNames({ dontShow: this.state.adminPassword !== "" })} style={{ width: "160px", marginTop: "-30px", marginLeft: "15px", transition: "all 0.3s" }} />
                        </FlexboxGrid>
                        <FlexboxGrid justify="start">
                            <input autoComplete="off" type="password"
                                style={{ fontSize : "20px", paddingLeft: "20px", marginTop: "-35px", width: "200px", background: "none", outline: "none", border: "none" }} onChange={e => this.setState({adminPassword: e.target.value})} />
                        </FlexboxGrid>
                    </div>

                    <button className="btnInvio" onClick={() => this.register()} style={{ position: "relative" }}>
                        <img style={{ position: "relative", zIndex: "1" }} src={btnFreccia} />
                        </button>
                </Modal.Footer>
            </div>
        </Modal>
        )
    }
}
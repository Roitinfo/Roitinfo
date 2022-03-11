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

export default class LoginModal extends React.Component
{
    /*
    Modal per effettuare il login:
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
                email : "",
                password : "",
            }
    }

    reset()
    {
        this.setState
        ({
            email : "",
            password : "",
        })
    }

    login()
    {
        axios.post(`${this.context.urlServer}/login`, {email: this.state.email, password: this.state.password}).then(res => 
        {
            if (res.data) 
            {
                this.props.onHide()
                this.reset()
                Cookie.set('token', res.data._id)
                this.context.setUser(res.data)
            } 
            else 
            {
                Alert.error("Email o password sbagliati")
            }
        })
    }

    render()
    {
        return (
        <Modal size="xs" show={true} onHide={this.props.onHide}>
            <div style={{ background: "#3f6493", margin: "-25px", borderRadius: "20px", padding: "20px", height: "320px" }}>
                <Modal.Header closeButton={false} style={{ height: "30px" }}>
                    <Modal.Title><img src={scrittaLogin} style={{ width: "70px", height: "30px" }} /></Modal.Title>
                    <FlexboxGrid justify="end" style={{ marginTop: "-28px" }}>
                        <button style={{ padding: "0px", background: "none" }} onClick={this.props.onHide}>
                            <img src={imgClose} id="imgClose" />
                        </button>
                    </FlexboxGrid>
                </Modal.Header>
                
                <Modal.Body style={{ marginTop: "20px", overflow: "hidden", height: "180px" }}>
                    {/*     INPUT EMAIL LOGIN     */}
                    <div>
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img src={imgEmail} className={classNames({ dontShow: this.state.email !== "" })} style={{ width: "55px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }}
                        onChange={e => this.setState({email:e.target.value})} />
                    </div>

                    {/*     INPUT PASSWORD LOGIN     */}
                    <div style={{ marginTop: "-60px" }}>
                        <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
                        <img className={classNames({dontShow: this.state.password !== ""})} src={imgPassword} style={{ width: "100px", height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
                        <input type="password" className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} 
                        onChange={e => this.setState({password: e.target.value})} />
                    </div>

                    <img src={imgAccount} style={{ width: "160px", height: "20px", marginTop: "-110px" }} />

                    <FlexboxGrid justify="start" style={{ marginTop: "-42px", marginBottom: "-20px", height: "35px" }}>
                        <button onClick={() => { this.props.onRegister() }} id="btnRegistrati" style={{ width: "100px", padding: "0px", borderRadius: "20px", position: "relative", zIndex: "1", background: "none", outline: "none" }}>
                            <img src={btnRegistrati} />
                        </button>
                    </FlexboxGrid>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btnInvio" onClick={() => {this.login()}} style={{ marginTop: "40px" }}>
                        <img style={{ position: "relative", zIndex: "1" }} src={btnFreccia} />
                    </button>
                </Modal.Footer>
            </div>
        </Modal>
        )
    }
}
import React from 'react'
import {FlexboxGrid, Modal, Alert} from 'rsuite'
import Cookie from 'js-cookie'
import scrittaLogin from '../../img/IMG_1419.png'
import imgClose from '../../img/IMG_1425.png'
import imgEmail from '../../img/IMG_1418.png'
import imgPassword from '../../img/IMG_1416.png'
import imgAccount from '../../img/IMG_1420.png'
import btnRegistrati from '../../img/Untitled_Artwork-3.png'
import btnFreccia from '../../img/Untitled_Artwork-1.png'
import AuthContext from '../../context/AuthContext'
import LoginField from './LoginField'
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
        console.log(this.state)
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
                
                <Modal.Body style={{ marginTop: "20px", overflow: "hidden"}}>
                    {/*     INPUT EMAIL LOGIN     */}
                    <LoginField type="email" onChange={e => this.setState({email:e.target.value})} fieldImg={imgEmail}/>

                    {/*     INPUT PASSWORD LOGIN     */}
                    <LoginField type="password" onChange={e => this.setState({password:e.target.value})} fieldImg={imgPassword}/>
                    
                    <div className='sizeBoxInput'>
                        <img src={imgAccount} style={{height: "20px"}} />
                        <FlexboxGrid justify="start" >
                            <button onClick={() => { this.props.onRegister() }} id="btnRegistrati" style={{ width: "100px", padding: "0px", paddingTop: "10px", borderRadius: "20px", position: "relative", zIndex: "1", background: "none", outline: "none" }}>
                                <img src={btnRegistrati} />
                            </button>
                        </FlexboxGrid>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btnInvio" onClick={() => {this.login()}}>
                        <img style={{ position: "relative", zIndex: "1" }} src={btnFreccia} />
                    </button>
                </Modal.Footer>
            </div>
        </Modal>
        )
    }
}
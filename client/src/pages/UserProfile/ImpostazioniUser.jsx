import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Input, Button, FlexboxGrid, Alert } from 'rsuite'
import Cookies from 'js-cookie'
import classNames from 'classnames'

import './ImpostazioniUser.css'

import AuthContext from 'context/AuthContext'

import backgroundInput from 'img/Impostazioni_profilo/Untitled_Artwork-21.png'
import imgCambiaNome from 'img/Impostazioni_profilo/Untitled_Artwork-37.png'
import imgSalva from 'img/Impostazioni_profilo/Untitled_Artwork.png'
import imgCambiaCognomeBlu from 'img/Impostazioni_profilo/Untitled_Artwork-31.png'
import imgPswVecchia from 'img/Impostazioni_profilo/Untitled_Artwork-24.png'
import imgNuovaPsw from 'img/Impostazioni_profilo/Untitled_Artwork-25.png'
import imgConfermaPsw from 'img/Impostazioni_profilo/Untitled_Artwork-26.png'

export default function ImpostazioniUser() {
    const { user, setUser, urlServer } = useContext(AuthContext)

    const history = useHistory()


    const [nameGrande, setNameGrande] = useState(user.name)
    const [surnameGrande, setSurnameGrande] = useState(user.surname)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [vecchiaPsw, setVecchiaPsw] = useState('')
    const [nuovaPsw, setNuovaPsw] = useState('')
    const [confermaNuovaPsw, setConfermaNuovaPsw] = useState('')
    const [loadingNome, setLoadingNome] = useState(false)
    const [loadingCognome, setLoadingCognome] = useState(false)
    const [loadingPsw, setLoadingPsw] = useState(false)

    const cambiaNome = () => {
        setLoadingNome(true)

        if (name === '') {
            Alert.error("Nome non valio")
            setLoadingNome(false)
            setFocusNome(false)

            return
        }

        axios.post(`${urlServer}/user/cambio-nome`, { id: user._id, name }).then(res => {
            console.log(res)

            user.name = name

            console.log(user)

            setUser(user)
            setNameGrande(name)
            setName('')
            setFocusNome(false)

            history.push('/profile')

            setLoadingNome(false)
        })
    }

    const cambiaCognome = () => {
        setLoadingCognome(true)

        if (surname === '') {
            Alert.error('Cognome non valido')
            setLoadingCognome(false)

            return
        }

        axios.post(`${urlServer}/user/cambio-cognome`, { id: user._id, surname }).then(res => {
            console.log(res)

            user.surname = surname

            setUser(user)
            setSurnameGrande(surname)
            setSurname('')
            setFocusCognome(false)

            history.push('/profile')

            setLoadingCognome(false)
        })
    }

    const cambiaPassword = () => {
        setLoadingPsw(true)

        if (vecchiaPsw === '' || nuovaPsw === '' || confermaNuovaPsw === '') {
            Alert.error('Password non valida')
            setLoadingPsw(false)

            return
        }

        if (nuovaPsw !== confermaNuovaPsw) {
            Alert.error("Le password sono diverse")
            setLoadingPsw(false)

            return
        }

        axios.post(`${urlServer}/user/cambio-password`, { id: user._id, nuova: nuovaPsw, vecchia: vecchiaPsw }).then(res => {
            console.log(res.data)

            if (res.data === false) {
                Alert.error("Password vecchia non valida")
                setLoadingPsw(false)
                setVecchiaPsw('')
                setFocusVecchiaPsw(false)
                setFocusNuovaPsw(false)
                setFocusConfermaPsw(false)

                return
            }

            setLoadingPsw(false)
            setVecchiaPsw('')
            setNuovaPsw('')
            setConfermaNuovaPsw('')
            Alert.info('Password cambiata con successo')
        })
    }



    //miliardi di condizioni onFucs!
    const [focusNome, setFocusNome] = useState(false)
    const [focusCognome, setFocusCognome] = useState(false)
    const [focusVecchiaPsw, setFocusVecchiaPsw] = useState(false)
    const [focusNuovaPsw, setFocusNuovaPsw] = useState(false)
    const [focusConfermaPsw, setFocusConfermaPsw] = useState(false)



    return (
        <div id="impostazioniUser">
            <FlexboxGrid justify="center">
                <div id="cambioNome" className="backgroundSectionProfile">
                    <p style={{ color: "white" }}>Cambia nome</p>
                    <img src={backgroundInput} style={{ width: "100%", height: "50px", marginTop: "30px" }} />
                    <img src={imgCambiaNome} className={classNames({ dontShow: focusNome, transitionInput: true })} style={{ width: "42%", marginTop: "-70px", marginLeft: "10px" }} />

                    <Input value={name} onChange={e => setName(e)} style={{ width: "100%", marginTop: "-61px", position: "relative", zIndex: "2", background: "none", border: "none" }} onFocus={() => setFocusNome(true)} onBlur={() => {
                        if (name === '')
                            setFocusNome(false)
                    }} />

                    <FlexboxGrid justify="end" style={{ marginTop: "10px" }}>
                        <button className="btnSalvaImpostazioni" onClick={cambiaNome}>
                            <img src={imgSalva} />
                        </button>
                    </FlexboxGrid>
                </div>
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <div id="cambioCognome" className="backgroundSectionProfile">
                    <p style={{ color: "white" }}>Cambia cognome</p>
                    <img src={backgroundInput} style={{ width: "100%", height: "50px", marginTop: "30px" }} />
                    <img src={imgCambiaCognomeBlu} className={classNames({ dontShow: focusCognome, transitionInput: true })} style={{ width: "50%", marginTop: "-70px", marginLeft: "10px" }} />

                    <Input value={surname} onChange={e => setSurname(e)} style={{ width: "100%", marginTop: "-61px", position: "relative", zIndex: "2", background: "none", border: "none" }} onFocus={() => setFocusCognome(true)} onBlur={() => {
                        if (surname === '')
                            setFocusCognome(false)
                    }} />

                    <FlexboxGrid justify="end" style={{ marginTop: "10px" }}>
                        <button className="btnSalvaImpostazioni" onClick={cambiaCognome}>
                            <img src={imgSalva} />
                        </button>
                    </FlexboxGrid>
                </div>
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <div id="cambioPassword" className="backgroundSectionProfile">
                    <p style={{ color: "white" }}>Cambia password</p>


                    <img src={backgroundInput} style={{ width: "100%", height: "50px", marginTop: "30px" }} />
                    <img src={imgPswVecchia} className={classNames({dontShow: focusVecchiaPsw, focusVecchiaPsw, transitionInput: true})} style={{ width: "50%", marginTop: "-75px", marginLeft: "10px" }} />
                    <Input value={vecchiaPsw} onChange={e => setVecchiaPsw(e)} style={{ width: "100%", marginTop: "-65px", position: "relative", zIndex: "2", background: "none", border: "none" }} onFocus={() => setFocusVecchiaPsw(true)} onBlur={() => {
                        if (vecchiaPsw === '')
                            setFocusVecchiaPsw(false)
                    }} />

                    <img src={backgroundInput} style={{ width: "100%", height: "50px", marginTop: "30px" }} />
                    <img src={imgNuovaPsw} className={classNames({dontShow: focusNuovaPsw, focusNuovaPsw, transitionInput: true})} style={{ width: "50%", marginTop: "-75px", marginLeft: "10px" }} />
                    <Input value={nuovaPsw} onChange={e => setNuovaPsw(e)} style={{ width: "100%", marginTop: "-65px", position: "relative", zIndex: "2", background: "none", border: "none" }} onFocus={() => setFocusNuovaPsw(true)} onBlur={() => {
                        if (nuovaPsw === '')
                            setFocusNuovaPsw(false)
                    }} />

                    <img src={backgroundInput} style={{ width: "100%", height: "50px", marginTop: "30px" }} />
                    <img src={imgConfermaPsw} className={classNames({dontShow: focusConfermaPsw, transitionInput: true})} style={{ width: "57%", marginTop: "-75px", marginLeft: "10px" }} />
                    <Input value={confermaNuovaPsw} onChange={e => setConfermaNuovaPsw(e)} style={{ width: "100%", marginTop: "-65px", position: "relative", zIndex: "2", background: "none", border: "none" }} onFocus={() => setFocusConfermaPsw(true)} onBlur={() => {
                        if (confermaNuovaPsw === '') 
                            setFocusConfermaPsw(false)
                    }} />


                    <FlexboxGrid justify="end" style={{ marginTop: "10px" }}>
                        <button className="btnSalvaImpostazioni" onClick={cambiaPassword}>
                            <img src={imgSalva} />
                        </button>
                    </FlexboxGrid>
                </div>
            </FlexboxGrid>


            <FlexboxGrid justify="center" style={{ marginTop: "30px" }}>
                <Button appearance="primary" onClick={() => { Cookies.remove('token'); history.push('/') }}>Esci</Button>
            </FlexboxGrid>
        </div>
    )
}

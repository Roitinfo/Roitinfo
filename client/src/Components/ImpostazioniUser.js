import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { Input, Button, FlexboxGrid, Alert } from 'rsuite'
import Cookies from 'js-cookie'

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

            return
        }

        axios.post(`${urlServer}/user/cambio-nome`, {id: user._id, name}).then(res => {
            console.log(res)

            user.name = name

            console.log(user)

            setUser(user)
            setNameGrande(name)
            setName('')

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

        axios.post(`${urlServer}/user/cambio-cognome`, {id: user._id, surname}).then(res => {
            console.log(res)

            user.surname = surname

            setUser(user)
            setSurnameGrande(surname)
            setSurname('')

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

        axios.post(`${urlServer}/user/cambio-password`, {id: user._id, nuova: nuovaPsw, vecchia: vecchiaPsw}).then(res => {
            console.log(res.data)

            if (res.data === false) {
                Alert.error("Password vecchia non valida")
                setLoadingPsw(false)
                setVecchiaPsw('')

                return 
            }

            setLoadingPsw(false)
            setVecchiaPsw('')
            setNuovaPsw('')
            setConfermaNuovaPsw('')
            Alert.info('Password cambiata con successo')
        })
    }



    return (
        <div id="impostazioniUser">
            <p id="nomeCognome">
                {nameGrande} {surnameGrande}
            </p>

            <FlexboxGrid justify="center">
                <div id="cambioNome">
                    <p>Cambia nome</p>
                    <Input value={name} onChange={e => setName(e)} placeholder="Cambia nome" />
                    <Button loading={loadingNome} onClick={cambiaNome} size="sm" appearance="primary">Salva</Button>
                </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <div id="cambioCognome">
                    <p>Cambia cognome</p>
                    <Input value={surname} onChange={e => setSurname(e)} placeholder="Cambia cognome" />
                    <Button loading={loadingCognome} onClick={cambiaCognome} size="sm" appearance="primary">Salva</Button>
                </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <div id="cambioPassword">
                    <p>Cambia password</p>
                    <Input value={vecchiaPsw} onChange={e => setVecchiaPsw(e)} type="password" placeholder="Password vecchia" />
                    <Input value={nuovaPsw} onChange={e => setNuovaPsw(e)} type="password" placeholder="Password nuova" />
                    <Input value={confermaNuovaPsw} onChange={e => setConfermaNuovaPsw(e)} type="password" placeholder="Conferma password" />
                    <Button loading={loadingPsw} onClick={cambiaPassword} size="sm" appearance="primary">Salva</Button>
                </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center" style={{marginTop: "30px"}}>
                <Button appearance="primary" onClick={() => {Cookies.remove('token'); history.push('/')}}>Esci</Button>
            </FlexboxGrid>
        </div>
    )
}

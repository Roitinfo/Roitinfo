import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'

import { Input, Button, FlexboxGrid, Alert } from 'rsuite'

export default function ImpostazioniUser() {
    const { user, setUser, urlServer } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [vecchiaPsw, setVecchiaPsw] = useState('')
    const [nuovaPsw, setNuovaPsw] = useState('')
    const [confermaNuovaPsw, setConfermaNuovaPsw] = useState('')

    const cambiaNome = () => {
        if (name === '') {
            Alert.error("Nome non valio")

            return
        }

        axios.post(`${urlServer}/user/cambio-nome`, {id: user._id, name}).then(res => {
            console.log(res)

            user.name = name

            setUser(user)
        })
    }

    const cambiaCognome = () => {
        if (surname === '') {
            Alert.error('Cognome non valido')
            
            return
        }

        axios.post(`${urlServer}/user/cambio-cognome`, {id: user._id, surname}).then(res => {
            console.log(res)
        })
    }

    const cambiaPassword = () => {
        if (vecchiaPsw === '' || nuovaPsw === '' || confermaNuovaPsw === '') {
            Alert.error('Password non valida')

            return
        }

        if (nuovaPsw !== confermaNuovaPsw) {
            Alert.error("Le password sono diverse")

            return
        }

        axios.post(`${urlServer}/user/cambio-password`, {id: user._id, nuova: nuovaPsw, vecchia: vecchiaPsw}).then(res => {
            console.log(res.data)

            if (res.data === false) {
                Alert.error("Password vecchia non valida")
            }
        })
    }



    return (
        <div id="impostazioniUser">
            <p id="nomeCognome">
                {user.name} {user.surname}
            </p>

            <FlexboxGrid justify="center">
                <div id="cambioNome">
                    <p>Cambia nome</p>
                    <Input value={name} onChange={e => setName(e)} placeholder="Cambia nome" />
                    <Button onClick={cambiaNome} size="sm" appearance="primary">Salva</Button>
                </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <div id="cambioCognome">
                    <p>Cambia cognome</p>
                    <Input value={surname} onChange={e => setSurname(e)} placeholder="Cambia cognome" />
                    <Button onClick={cambiaCognome} size="sm" appearance="primary">Salva</Button>
                </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <div id="cambioPassword">
                    <p>Cambia password</p>
                    <Input value={vecchiaPsw} onChange={e => setVecchiaPsw(e)} type="password" placeholder="Password vecchia" />
                    <Input value={nuovaPsw} onChange={e => setNuovaPsw(e)} type="password" placeholder="Password nuova" />
                    <Input value={confermaNuovaPsw} onChange={e => setConfermaNuovaPsw(e)} type="password" placeholder="Conferma password" />
                    <Button onClick={cambiaPassword} size="sm" appearance="primary">Salva</Button>
                </div>
            </FlexboxGrid>
        </div>
    )
}

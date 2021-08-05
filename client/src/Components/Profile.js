import React, { useContext, useState, useEffect } from 'react'
import Header from './Header'
import AuthContext from '../Context/AuthContext'
import ArticoliSalvati from './ArticoliSalvati'
import ProblemiSalvati from './ProblemiSalvati'
import NewPost from './NewPost'
import Footer from './Footer'
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'

import { Container, Sidenav, Sidebar, Content, Nav, Icon, FlexboxGrid, Placeholder, Portal } from 'rsuite'
import './Profile.css'
import imgArticolo from '../img/articolo.png'
import imgProblema from '../img/problem-solving.png'
import imgManoConPenna from '../img/writing.png'
import { Spin, Space } from 'antd';


export default function Profile() {

    const history = useHistory()

    const { Paragraph } = Placeholder

    const { user } = useContext(AuthContext)

    const [contentValue, setcontentValue] = useState(<ArticoliSalvati />)

    const option = (e) => {
        switch (e) {
            case "Impostazioni":

                break;

            case "Articoli":
                setcontentValue(<ArticoliSalvati />)

                break;

            case "Problemi":
                setcontentValue(<ProblemiSalvati />)

                break;

            case "Scrivi":

                console.log("cliccato")
                setcontentValue(<NewPost />)
                break;

            default:
                console.log("finisce qui")
                break;
        }
    }

    if (Cookies.get('token') === undefined) {
        history.push('/')

        return <div></div>
    }

    if (user === undefined) {
        return (
            <div>
                <Header />
                <FlexboxGrid id="loadingPageProfile" justify="center">
                    <Space size="middle">
                        <Spin size="large" />
                    </Space>
                </FlexboxGrid>
            </div>
        )
    }

    return (
        <div>
            <Header />

            <Container>
                <FlexboxGrid align="middle">
                    <Sidebar id="sidebar">
                        <Sidenav id="sidenav">
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item onClick={option("Impostazioni")}>
                                        {
                                            user ? <p id="nomeUser"><button id="iconImpostazioni"><Icon size="lg" icon="cog" /></button> {user.name} {user.surname}</p> : <p id="nomeUser"><Paragraph active /> <button><Icon icon="cog" /></button></p>
                                        }
                                    </Nav.Item>
                                    <Nav.Item onClick={() => option("Articoli")} icon={<img className="imgIcon" src={imgArticolo} alt="immagine di un articolo" />}>
                                        Articoli salvati
                                    </Nav.Item>
                                    <Nav.Item onClick={() => option("Problemi")} icon={<img className="imgIcon" src={imgProblema} alt="incona pulsante problemi salvati" />}>
                                        Problemi salvati
                                    </Nav.Item>
                                    {
                                        user.admin ? <Nav.Item onClick={() => option("Scrivi")} icon={<img className="imgIcon" src={imgManoConPenna} alt="mano con una penna" />}>Scrivi</Nav.Item> : ''
                                    }
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                    </Sidebar>

                </FlexboxGrid>
                <Content id="content">
                    {contentValue}
                </Content>
            </Container>
            <Footer />
        </div>
    )
}
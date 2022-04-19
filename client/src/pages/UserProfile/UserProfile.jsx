import React, { useContext, useState } from 'react'
import { Spin, Space } from 'antd';
import { useHistory } from 'react-router'
import Cookies from 'js-cookie'
import { Container, Sidenav, Sidebar, Content, Nav, Icon, FlexboxGrid, Placeholder } from 'rsuite'

import './UserProfile.css'
import ArticoliSalvati from './ArticoliSalvati'
import ProblemiSalvati from './ProblemiSalvati'
import PostEditor from './PostEditor'
import ImpostazioniUser from './ImpostazioniUser'

import ScegliPost from 'components/ScegliPost'
import AuthContext from 'context/AuthContext'

import imgArticolo from 'img/articolo.png'
import imgProblema from 'img/problem-solving.png'
import imgManoConPenna from 'img/writing.png'
import imgEdit from 'img/edit.png'


export default function UserProfile() {

    const history = useHistory()

    const { Paragraph } = Placeholder

    const { user } = useContext(AuthContext)

    const [contentValue, setcontentValue] = useState(<ArticoliSalvati />)

    const modifyArticle = (id) => {
        console.log(id)
        setcontentValue(<PostEditor id={id}/>)
    }

    const option = (e) => {
        switch (e) {
            case "Impostazioni":
                setcontentValue(<ImpostazioniUser />)
                break;

            case "Articoli":
                setcontentValue(<ArticoliSalvati />)
                break;

            case "Problemi":
                setcontentValue(<ProblemiSalvati />)
                break;

            case "Modifica":
                setcontentValue(<ScegliPost onArticleSelected={ (e) => modifyArticle(e)}/>)
                break;

            case "Scrivi":
                setcontentValue(<PostEditor/>)
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
            <Container>
                    <Sidebar id="sidebar">
                        <Sidenav id="sidenav" style={{backgroundColor: "#f3f3f3", marginTop: "50px"}}>
                            <Sidenav.Body>
                                <Nav>
                                    <Nav.Item onClick={() => option("Impostazioni")}>
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
                                        user.admin ? <Nav.Item onClick={() => option("Modifica")} icon={<img className="imgIcon" src={imgEdit} alt="modifica articolo" />}>Modifica</Nav.Item> : ''
                                    }
                                    {
                                        user.admin ? <Nav.Item onClick={() => option("Scrivi")} icon={<img className="imgIcon" src={imgManoConPenna} alt="mano con una penna" />}>Scrivi</Nav.Item> : ''
                                    }
                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>
                    </Sidebar>                
                <Content id="content">
                    {contentValue}
                </Content>
            </Container>
        </div>
    )
}
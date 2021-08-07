import React, { useEffect, useContext, useState } from 'react'
import Header from './Header'
import { useParams, useHistory } from 'react-router'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Footer from './Footer'
import ReactPlayer from 'react-player/youtube';

import { Placeholder, FlexboxGrid, Icon, Divider, Checkbox } from 'rsuite'
import './Post.css'
import imgCircle from '../img/circle-outline.png'
import imgCheck from '../img/checkbox-mark.png'

export default function Post() {
    const { Paragraph } = Placeholder

    const history = useHistory()

    const { id } = useParams()

    const { urlServer, user, setUser } = useContext(AuthContext)

    const [post, setPost] = useState(false)
    const [stylePost, setStylePost] = useState([])
    const [bookmark, setBookmark] = useState('')

    const save = async (e) => {
        user.preferiti.push(id)

        setUser(user)

        await axios.post(`${urlServer}/post/add-preferito`, { id: user._id, preferiti: user.preferiti }).then(res => {
            console.log(res)
        })

        setBookmark(<button id={post._id} onClick={remove} className="btnSave"><Icon icon="bookmark" size="2x" /></button>)
    }

    const remove = async (e) => {
        let temp = []

        for (let i = 0; i < user.preferiti.length; i++) {
            if (user.preferiti[i] !== id) {
                temp.push(user.preferiti[i])
            }
        }

        user.preferiti = temp

        setUser(user)

        await axios.post(`${urlServer}/post/remove-preferito`, { id: user._id, preferiti: temp }).then(res => {
            console.log(res.data)

            console.log("user preferiti", user.preferiti, user.preferiti.includes(post._id))
        })

        setBookmark(<button onClick={save} id={post._id} className="btnSave"><Icon icon="bookmark-o" size="2x" /></button>)
    }

    const savePost = () => {
        if (user) {
            let controllo = true;

            for (let i = 0; i < user.preferiti.length; i++) {
                if (user.preferiti[i] === id) {
                    controllo = false
                }
            }

            if (controllo) {
                setBookmark(<button onClick={save} id={post._id} className="btnSave"><Icon icon="bookmark-o" size="2x" /></button>)
            } else {
                setBookmark(<button id={post._id} onClick={remove} className="btnSave"><Icon icon="bookmark" size="2x" /></button>)
            }
        }
    }

    useEffect(() => {
        axios.post(`${urlServer}/post/exact`, { id }).then(res => {
            console.log("data post siii", res.data)
            setPost(res.data[0])
            savePost()
        })


    }, [])



    //struttra articolo

    const makeHeader = e => {

        const CustomTag = `h${e.data.level}`

        return (
            <CustomTag className="headerArticolo">
                {e.data.text}
            </CustomTag>
        )
    }


    const makeParagraph = e => {

        return (
            <div dangerouslySetInnerHTML={{ __html: e.data.text }}></div>
        )
    }

    const makeLinkYoutube = e => {

        return (
            <FlexboxGrid className="videoYoutube" justify="center">
                <ReactPlayer url={e.data.link} />
            </FlexboxGrid>
        )
    }

    const makeDelimiter = e => {
        return (
            <Divider />
        )
    }

    const makeCheckList = e => {
        console.log("la lista viene chiamata")
        return <div className="checkListContainer">
            {
                e.data.items.map(el => {
                    if (el.checked) {
                        return (
                            <div className="divProva">
                                <img className="imgCerchio" src={imgCircle} alt="cerchio" />
                                <img className="imgCheck" src={imgCheck} alt="check" />
                                {el.text}
                            </div>
                        )
                    } else {
                        return (
                            <div className="divProva">
                                <img className="imgCerchio" src={imgCircle} alt="cerchio" />
                                {el.text}
                            </div>
                        )
                    }
                })
            }
        </div>
    }


    const makeList = e => {
        if (e.data.style === "ordered") {
            return (
                <div>
                    {
                        e.data.items.map((el, index) => {
                            return (
                                <div className="elListaNumerata">
                                    <p>{index}.</p>
                                    <p className="pListaNumerata">{el}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }



    useEffect(() => {
        if (post) {
            console.log("postsssssss", post)
            post.blocks.map(obj => {
                console.log("obj", obj)
                switch (obj.type) {
                    case "Header":
                        console.log("Header crearto")
                        setStylePost(e => [...e, makeHeader(obj)])
                        break;

                    case "paragraph":
                        console.log("paragraph creato")
                        setStylePost(e => [...e, makeParagraph(obj)])
                        break;

                    case "LinkTool":
                        setStylePost(e => [...e, makeLinkYoutube(obj)])
                        break;

                    case "Delimiter":
                        setStylePost(e => [...e, makeDelimiter(obj)])
                        break;

                    case "CheckList":
                        setStylePost(e => [...e, makeCheckList(obj)])
                        break;

                    case "List":
                        setStylePost(e => [...e, makeList(obj)])

                    default:
                        break;
                }
            })
        }

    }, [post])


    useEffect(() => {
        savePost()

        console.log("user", user)
    }, [user])

    if (!post) {
        return (
            <div>
                <Header />
                <div className="Post">
                    <FlexboxGrid justify="center">
                        <p className="title">
                            <Paragraph active />
                        </p>
                    </FlexboxGrid>
                    <div className="text">
                        <Paragraph active />
                        <Paragraph active />
                        <Paragraph active />
                        <Paragraph active />
                        <Paragraph active />
                        <Paragraph active />
                        <Paragraph active />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div id="pagePost">
                <Header />
                <div className="Post">
                    <FlexboxGrid justify="end">
                        {bookmark}
                    </FlexboxGrid>
                    <FlexboxGrid justify="center">
                        <p className="title">{post.title}</p>
                    </FlexboxGrid>
                    <div id="testoArticolo">
                        {
                            stylePost.map(e => e)
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

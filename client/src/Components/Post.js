import React, { useEffect, useContext, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Footer from './Footer'

import { Placeholder, FlexboxGrid, Icon, Button } from 'rsuite'
import './Post.css'

export default function Post() {
    const { Paragraph } = Placeholder

    const { id } = useParams()

    const { urlServer } = useContext(AuthContext)

    const [post, setPost] = useState(false)

    useEffect(() => {
        axios.post(`${urlServer}/post/exact`, { id }).then(res => {
            console.log(res.data)
            setPost(res.data[0])
        })
    }, [])

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
                        <button id="btnSave"><Icon icon="bookmark-o" size="2x" /></button>
                    </FlexboxGrid>
                    <FlexboxGrid justify="center">
                        <p className="title">{post.title}</p>
                    </FlexboxGrid>
                    <div className="text">
                        {post.text}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

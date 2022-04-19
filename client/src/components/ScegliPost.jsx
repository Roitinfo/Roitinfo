import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import classNames from 'classnames';
import { Space, Spin } from 'antd';
import { FlexboxGrid} from 'rsuite'

import ShortArticle from './ShortArticle';
import Pagination from './Pagination'

import AuthContext from 'context/AuthContext'

import Scritta from 'img/IMG_1408.png'
import Lente from 'img/IMG_1409.png'

export default function ScegliPost({ onArticleSelected }) {
    const { urlServer, user } = useContext(AuthContext)

    useEffect(() => {
        axios.post(`${urlServer}/posts`).then(res => {
            console.log(res.data)
            setPosts(res.data)
            setpostsFiltrati(res.data)
        })
    }, [])

    // ---------------------- get posts

    const [posts, setPosts] = useState([])
    const [postsFiltrati, setpostsFiltrati] = useState(posts)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    //Get current post
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = postsFiltrati.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (e) => {
        setCurrentPage(e)
    }

    const filterPosts = () => {
        if (search === '') {
            setpostsFiltrati(posts)

            return
        }

        setpostsFiltrati(posts.filter(el => el.title.toLowerCase().includes(search.toLowerCase())))
    }

    useEffect(() => {
        filterPosts()
    }, [search])


    const [focusSearch, setFocusSearch] = useState(false)

    return (
        <div>
            <div id="posts">

                {/* Barra di ricerca */}
                <div style={{ marginTop: "50px", height: "100px" }}>
                    <FlexboxGrid justify="center">
                        <div style={{ width: "250px", padding: "10px", borderRadius: "10px", marginTop: "20px", backgroundColor: "#f3f3f3", marginLeft: "93px" }}>
                            <img src={Lente} style={{ width: "25px", height: "25px" }} />
                            <img src={Scritta} id="searchShow" className={classNames({ dontShow: search })} style={{ width: "180px", height: "30px", marginTop: "4px", marginLeft: "10px", position: "relative", zIndex: "2", transition: "all 0.3s" }} />
                        </div>
                    </FlexboxGrid>
                    <FlexboxGrid justify="center">
                        <input autoComplete="off" onChange={(e) => { setSearch(e.target.value) }} onBlur={() => {
                            if (search === '')
                                setFocusSearch(false)
                        }} onFocus={() => {
                            setFocusSearch(true)
                        }} style={{ fontSize: "20px", position: "relative", zIndex: "4", background: "none", marginLeft: "90px" }} className="searchArticles" value={search} />
                    </FlexboxGrid>
                </div>

                <FlexboxGrid justify="center">
                    {
                        !postsFiltrati.length && !posts.length ?
                            <FlexboxGrid justify="center" className="loadingPost"><Space size="middle"><Spin size="large" /></Space></FlexboxGrid>
                            : currentPost.map(e => <ShortArticle article={e} onArticleSelected={e => onArticleSelected(e)} />)
                    }
                </FlexboxGrid>

                <Pagination posts={postsFiltrati} postsPerPage={postsPerPage} paginate={setCurrentPage} />
            </div>
        </div>
    )
}
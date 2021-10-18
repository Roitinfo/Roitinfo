import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Header from './Header'
import Posts from './Posts'
import Pagination from './Pagination'
import ShortArticles from './ShortArticles'
import classNames from 'classnames'


import './Articoli.css'

import Sfondo from '../img/sfondo_page_articoli.png'
import SfondoScrittaArticoli from '../img/Untitled_Artwork-11.png'
import ScrittaArticoli from '../img/Untitled_Artwork-12.png'
import Scritta from '../img/IMG_1408.png'
import Lente from '../img/IMG_1409.png'

import { FlexboxGrid } from 'rsuite'

export default function Articoli() {

    const { urlServer } = useContext(AuthContext)

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            let res = await axios.post(`${urlServer}/posts`)
            res = res.data
            console.log(res)
            setPosts(res)
            setCurrentPost(res.slice(indexOfFirstPost, indexOfLastPost))
            setLoading(false)
        }

        fetchPosts()
    }, [])

    //Get current post
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const [currentPost, setCurrentPost] = useState(posts.slice(indexOfFirstPost, indexOfLastPost))

    const paginate = (e) => {
        setCurrentPage(e)
    }

    //se false appare nell'input la scritta "Search your articles" se è true la scritta sparisce
    const [search, setSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (searchValue !== '') {
            setCurrentPost(posts.filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase())))
        } else {
            setCurrentPost(posts.slice(indexOfFirstPost, indexOfLastPost))
        }
    }, [searchValue])

    useEffect(() => {
        setCurrentPost(posts.slice(indexOfFirstPost, indexOfLastPost))
    }, [currentPage])

    return (
        <div>
            <Header />
            <div style={{ position: "relative", top: "30px" }}>
                <FlexboxGrid justify="center">
                    <img src={SfondoScrittaArticoli} style={{ width: "400px" }} />
                    <img src={ScrittaArticoli} style={{ width: "200px", marginLeft: "-300px", marginTop: "9px" }} />
                </FlexboxGrid>
            </div>

            <div style={{ marginTop: "50px", height: "100px" }}>
                <FlexboxGrid justify="center">
                    <div style={{ width: "250px", padding: "10px", borderRadius: "10px", marginTop: "20px", backgroundColor: "#f3f3f3", marginLeft: "93px" }}>
                        <img src={Lente} style={{ width: "25px", height: "25px" }} />
                        <img src={Scritta} id="searchShow" className={classNames({ dontShow: search })} style={{ width: "180px", height: "30px", marginTop: "4px", marginLeft: "10px", position: "relative", zIndex: "2", transition: "all 0.3s" }} />
                    </div>
                </FlexboxGrid>
                {/* Barra di ricerca */}
                <FlexboxGrid justify="center">
                    <input autoComplete="off" onChange={(e) => { setSearchValue(e.target.value) }} onBlur={() => {
                        if (searchValue === '')
                            setSearch(false)
                    }} onFocus={() => {
                        setSearch(true)
                    }} style={{ fontSize: "20px", position: "relative", zIndex: "4", background: "none", marginLeft: "90px" }} className="searchArticles" value={searchValue} />
                </FlexboxGrid>
            </div>

            <div style={{ width: "100%", height: "1700px", overflow: "hidden", marginTop: "-210px" }}>
                <img src={Sfondo} style={{ width: "100%" }} />
            </div>
            <div style={{ marginTop: "-1500px" }}>
                <FlexboxGrid justify="center" style={{ minHeight: "200px" }}>
                    {
                        currentPost.map(e => <ShortArticles articles={e} center={false} />)
                    }
                </FlexboxGrid>
                <Pagination posts={posts} postsPerPage={postsPerPage} paginate={paginate} />
            </div>
        </div>
    )
}

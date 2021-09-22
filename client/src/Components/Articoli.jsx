import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../Context/AuthContext'
import Header from './Header'
import Posts from './Posts'
import Pagination from './Pagination'

import './Articoli.css'

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
            setLoading(false)
        }
        
        fetchPosts()
    }, [])

    //Get current post
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (e) => {
        setCurrentPage(e)
    }

    return (
        <div>
            <Header />
            <Posts posts={currentPost} loading={loading} />
            <Pagination posts={posts} postsPerPage={postsPerPage} paginate={paginate} /> 
        </div>
    )
}

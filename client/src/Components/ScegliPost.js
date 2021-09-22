import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { Link } from 'react-router-dom';
import Pagination from './Pagination'
import axios from 'axios';

import {FlexboxGrid, TagGroup, Tag, Icon, Input, InputGroup, Panel} from 'rsuite'

import { Space, Spin } from 'antd';

export default function ModificaPost(props) {
    const { urlServer, user } = useContext(AuthContext)

    useEffect(() => {
        axios.post(`${urlServer}/posts`).then(res => {
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

    return (
        <div>
            <div id="posts">
                <InputGroup inside id="inputSearch">
                    <InputGroup.Addon>
                        <Icon icon="search" />
                    </InputGroup.Addon>

                    <Input value={search} onChange={e => setSearch(e)} type="search" placeholder="Cerca articolo" />
                </InputGroup>
                {
                    !postsFiltrati.length && !posts.length ?
                        <FlexboxGrid justify="center" className="loadingPost"><Space size="middle"><Spin size="large" /></Space></FlexboxGrid>
                        : currentPost.map(e => {
                            return (
                                <Link className="linkArticolo" id={e._id} onClick={e => props.onArticleSelected(e)}>
                                    <Panel className="articolo" header={e.title} shaded>
                                        <label className="scrittaTag">Tag</label>
                                        <TagGroup className="tag">
                                            {e.tags.map(tag => {
                                                return (
                                                    <Tag>{tag}</Tag>
                                                )
                                            })}
                                        </TagGroup>
                                        <p className="description">
                                            {e.description}
                                        </p>
                                    </Panel>
                                </Link>

                            )
                        })
                }
                <Pagination posts={postsFiltrati} postsPerPage={postsPerPage} paginate={paginate} />
            </div>
        </div>
    )
}
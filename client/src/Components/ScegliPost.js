import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { Link } from 'react-router-dom';
import Pagination from './Pagination'
import axios from 'axios';

import { Button, FlexboxGrid, TagGroup, Tag, IconButton, Icon, Input, InputGroup, Placeholder, Panel, Alert } from 'rsuite'

import { Input as AInput, Space, Spin } from 'antd';


import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import List from '@editorjs/list'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'


export default function ModificaPost(props) {
    const [renderInput, setrenderInput] = useState('')

    const { urlServer, user } = useContext(AuthContext)

    const { TextArea } = AInput;
    const { Paragraph } = Placeholder

    //contenuto del component
    const [content, setContent] = useState('Scelta articolo')

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
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    const fetchPosts = async () => {
        setLoading(true)
        let res = await axios.post(`${urlServer}/posts`)
        res = res.data
        console.log(res)
        setPosts(res)
        setLoading(false)
    }

    //Get current post
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

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
                        : postsFiltrati.map(e => {
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
                <Pagination posts={posts} postsPerPage={postsPerPage} paginate={paginate} />
            </div>
        </div>
    )
}
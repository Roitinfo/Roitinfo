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

    const [modificaPost, setModificaPost] = useState(false)

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

    useEffect(() => {
        fetchPosts()

    }, [])

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

    useEffect(() => {
        filterPosts()
    }, [search])


    const [data, setData] = useState(null)
    const [title, setTitle] = useState('')
    const [textArea, setTextArea] = useState('')
    const [state, setState] = useState({
        typing: false,
        inputValue: '',
        tags: []
    })
    const [loadingSave, setLoadingSave] = useState(false)

    // ---------------------- editojs

    const handleButtonClick = () => {
        let e = state
        e.typing = true

        console.log("handleInputChange", state)

        setState(e)

        renderInputFun()
    }

    const handleInputChange = (inputValue) => {
        let e = state

        e.inputValue = inputValue

        setState(e);

        renderInputFun()
    }

    const handleInputConfirm = () => {
        const { inputValue, tags } = state;
        const nextTags = inputValue ? [...tags, inputValue] : tags;

        let e = state

        e.tags = nextTags
        e.typing = false
        e.inputValue = ''

        console.log(e)

        setState(e);

        renderInputFun()
    }

    const handleTagRemove = (tag) => {
        const { tags } = state;
        const nextTags = tags.filter(item => item !== tag);
        let temp = state
        temp.tags = nextTags

        setState(temp);
        renderInputFun()
    }

    const renderInputFun = async () => {
        const { typing, inputValue } = state;

        if (typing) {
            setrenderInput(
                <Input
                    className="tag-input"
                    size="xs"
                    style={{ width: 70 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                    id="inputTag"
                />
            );

            return
        }

        setrenderInput(
            <IconButton
                className="tag-add-btn"
                onClick={handleButtonClick}
                icon={<Icon icon="plus" />}
                appearance="ghost"
                size="xs"
                id="btnPlus"
            />
        );
    }


    //imposta l'articolo da modificare
    const modifica = e => {
        console.log("modifica", e.currentTarget.id)

        axios.post(`${urlServer}/post/data`, { id: e.currentTarget.id }).then(res => {
            console.log("DATA:")
            console.log(res.data[0])
            setModificaPost(res.data[0])
            let temp = {}
            temp['blocks'] = res.data[0].blocks
            temp['time'] = res.data[0].time
            temp['version'] = res.data[0].version

            console.log(temp)

            setData(temp)
            setContent('Modifica articolo')
            setTitle(res.data[0].title)
            setTextArea(res.data[0].description)

            let tempTags = state

            tempTags.tags = res.data[0].tags

            setState(tempTags)
            renderInputFun()
        })
    }

    const save = async () => {
        setLoadingSave(true)

        const post = await data.save()

        post['tags'] = state.tags
        post['title'] = title
        post['description'] = textArea
        post['modificato'] = modificaPost.modificato

        if (!post['modificato'].includes(user._id)) {
            post['modificato'] = user._id
        }

        axios.post(`${urlServer}/post/modifica`, {post, id: modificaPost._id}).then(res => {
            console.log("articolo modificato", res.data)
            setLoadingSave(false)

            Alert.info("Articolo modificato con successo")
        })

    }

    const { tags } = state

    if (content === 'Scelta articolo') {
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
    } else if (content === 'Modifica articolo') {
        return (
            <div className="editor">
                <Input value={title} onChange={e => setTitle(e)} placeholder="Titolo dell'articolo" value={title} onChange={e => setTitle(e)} id="titoloArticolo" />
                <TextArea value={textArea} onChange={e => setTextArea(e)} value={textArea} onChange={e => setTextArea(e.target.value)} showCount maxLength={200} placeholder="Descrizione" />
                <p id="divisore"></p>

                {
                    data !== null ? <EditorJs data={data} instanceRef={e => setData(e)} tools={{ Header, CheckList, List, Delimiter, InlineCode, Marker, LinkTool }} /> : ''
                }

                <TagGroup>
                    {
                        tags.map((item, index) => (
                            <Tag
                                key={index}
                                closable
                                onClose={() => {
                                    handleTagRemove(item);
                                }}
                            >
                                {item}
                            </Tag>
                        ))
                    }
                    {renderInput}
                </TagGroup>

                <FlexboxGrid justify="center">
                    <Button loading={loadingSave} onClick={save} appearance="primary" id="modificaArticolo">Salva</Button>
                </FlexboxGrid>
            </div>
        )
    }
}
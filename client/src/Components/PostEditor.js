import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import axios from 'axios';

import { Button, FlexboxGrid, TagGroup, Tag, IconButton, Icon, Input, Alert } from 'rsuite'

import { Input as AInput } from 'antd';


import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import List from '@editorjs/list'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'

export default function NewPost(props) {
    
    const [id, setId] = useState(null)
    const [data, setData] = useState(null)
    const [state, setState] = useState({
        typing: false,
        inputValue: '',
        tags: ['javascript', 'css', 'react']
    })
    const [renderInput, setrenderInput] = useState('')

    const { urlServer, user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [textArea, setTextArea] = useState('')
    const [loadingSave, setLoadingSave] = useState(false)

    const { TextArea } = AInput;

    useEffect(() => {
        console.log("à cambiato")
        
        if (props.id)
        {
            if (props.id != id)
            {
                console.log("article id: ", props.id)
                loadPost(props.id)
            }
        }
        renderInputFun()

    }, [state])


    const loadPost = postId => {
        setId(postId)
        axios.post(`${urlServer}/post/data`, { id: postId }).then(res => {
            console.log("DATA:")
            console.log(res.data[0])
            console.log(res.data[0].blocks)
            console.log(res.data[0].time)
            console.log(res.data[0].version)
            let temp = {}
            temp['blocks'] = res.data[0].blocks
            temp['time'] = res.data[0].time
            temp['version'] = res.data[0].version

            setData(temp)
            console.log("loaded data: " + temp)

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
        console.log("data:", + data)
        const post = await data.save()

        post['tags'] = state.tags
        post['title'] = title
        post['creator'] = user._id
        post['description'] = textArea
        post['modificato'] = []

        console.log(post)

        if (!id)
        {
            axios.post(`${urlServer}/post/add`, {post}).then(res => {
                console.log("articolo pubblicato", res.data)
                setLoadingSave(false)
                setId(res.data._id)

                Alert.info("Articolo pubblicato con successo")
            })
        }
        else
        {
            axios.post(`${urlServer}/post/modifica`, {post, id: id}).then(res => {
                console.log("articolo modificato", res.data)
                setLoadingSave(false)
    
                Alert.info("Articolo modificato con successo")
            })
        }
    }

    const handleButtonClick = () => {
        let e = state
        e.typing = true

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
        setState({
            tags: nextTags
        });
    }

    const renderInputFun = async () => {
        const { typing, inputValue } = state;

        if (typing) {
            setrenderInput (
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

        setrenderInput ( 
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

    const { tags } = state

    return (
        <div className="editor">
            <Input placeholder="Titolo dell'articolo" value={title} onChange={e => setTitle(e)} id="titoloArticolo" />
            <TextArea value={textArea} onChange={e => setTextArea(e.target.value)} showCount maxLength={200} placeholder="Descrizione" />
            <p id="divisore"></p>
            {(!props.id || data !== null) ? <EditorJs data={data} instanceRef={e => setData(e)} tools={{ Header, CheckList, List, Delimiter, InlineCode, Marker, LinkTool }} />  : ""}

            <TagGroup>
                {tags.map((item, index) => (
                    <Tag
                        key={index}
                        closable
                        onClose={() => {
                            handleTagRemove(item);
                        }}
                    >
                        {item}
                    </Tag>
                ))}
                {renderInput}
            </TagGroup>

            <FlexboxGrid justify="center">
                <Button loading={loadingSave} onClick={save} appearance="primary">{id ? "Salva" : "Pubblica"}</Button>
            </FlexboxGrid>
        </div>
    )
}

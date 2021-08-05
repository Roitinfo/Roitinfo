import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../Context/AuthContext'

import { Button, FlexboxGrid, TagGroup, Tag, IconButton, Icon, Input } from 'rsuite'


import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import List from '@editorjs/list'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import Marker from '@editorjs/marker'
import Header from '@editorjs/header'
import LinkTool from '@editorjs/link'
import axios from 'axios';

export default function NewPost() {
    const [data, setData] = useState()
    const [state, setState] = useState({
        typing: false,
        inputValue: '',
        tags: ['javascript', 'css', 'react']
    })
    const [renderInput, setrenderInput] = useState('')

    const { urlServer } = useContext(AuthContext)

    const [title, setTitle] = useState('')

    useEffect(() => {
        console.log("à cambiato")
        renderInputFun()
    }, [state])



    const save = async () => {
        const post = await data.save()

        post['tags'] = state.tags
        post['title'] = title

        console.log(post)

        axios.post(`${urlServer}/post/add`, {post}).then(res => {
            console.log(res.data)
        })
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
        <div id="editor">
            <Input placeholder="Titolo dell'articolo" value={title} onChange={e => setTitle(e)} id="titoloArticolo" />
            <EditorJs data={data} instanceRef={e => setData(e)} tools={{ Header, CheckList, List, Delimiter, InlineCode, Marker, LinkTool }} />

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
                <Button onClick={save} appearance="primary">Salva</Button>
            </FlexboxGrid>
        </div>
    )
}

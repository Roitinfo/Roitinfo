import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import { FlexboxGrid, Panel, Placeholder, Tag, TagGroup } from 'rsuite'
import { Empty, Space, Spin } from 'antd'

export default function ArticoliSalvati() {

    const history = useHistory()

    const { user, urlServer } = useContext(AuthContext)

    const [data, setData] = useState(false)
    const [posts, setPosts] = useState([])

    const getDataPots = async () => {
        for (let i = 0; i < user.preferiti.length; i++) {
            const res = await axios.post(`${urlServer}/post`, { id: user.preferiti[i] })

            console.log("for data", res.data)
            
            setPosts(e =>  [...e, res.data[0]])
        }

        history.push('/profile')

        return true
    }

    useEffect(() => {

        getDataPots().then((res) => {
            if(user.preferiti.length) {
                setData(true)
            }
        })

    }, [])


    return (
        <div>
            {
                data ? posts.map(e => {
                    return < Link className="linkArticolo" to={`/post/${e._id}`}>
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
                    </Link >
                }) : user.preferiti.length ? <FlexboxGrid justify="center" className="loadingArgomento"><Space size="middle"><Spin size="large" /></Space></FlexboxGrid> : <Empty style={{marginTop: "50px"}} />
            }
        </div>
    )
}

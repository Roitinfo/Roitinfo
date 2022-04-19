import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FlexboxGrid } from 'rsuite'
import { Empty, Space, Spin } from 'antd'

import ShortArticle from 'components/ShortArticle'
import AuthContext from 'context/AuthContext'

export default function ArticoliSalvati() {

    const history = useHistory()

    const { user, urlServer } = useContext(AuthContext)

    const [data, setData] = useState(false)
    const [posts, setPosts] = useState([])

    const getDataPots = async () => {
        for (let i = 0; i < user.preferiti.length; i++) {
            const res = await axios.post(`${urlServer}/post`, { id: user.preferiti[i] })

            console.log("for data", res.data)

            setPosts(e => [...e, res.data[0]])
        }

        history.push('/profile')

        return true
    }

    useEffect(() => {

        getDataPots().then((res) => {
            if (user.preferiti.length) {
                setData(true)
            }
        })

    }, [])


    return (
        <div>
            <FlexboxGrid justify="center">
                {
                    data ? posts.map(e => <ShortArticle article={e} />) : user.preferiti.length ? <FlexboxGrid justify="center" className="loadingArgomento"><Space size="middle"><Spin size="large" /></Space></FlexboxGrid> : <Empty style={{ marginTop: "50px" }} />
                }
            </FlexboxGrid>

        </div>
    )
}

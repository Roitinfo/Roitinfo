import React from 'react'
import { Link } from 'react-router-dom'

import { TagGroup, Tag, Panel, Placeholder, FlexboxGrid } from 'rsuite'
import './Posts.css'

export default function Posts({ posts, loading }) {
    const { Paragraph } = Placeholder

    if (loading) {
        return (
            <div>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
                <Panel className="articolo" header={<Paragraph active />} shaded>
                    <Paragraph active />
                    <Paragraph active />
                    <Paragraph active />
                </Panel>
            </div>
        )
    }



    return (
        <div id="prova2">
            {posts.map(e => {
                return (
                    <Link className="linkArticolo" to={`/post/${e._id}`}>
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
        </div>
    )
}

import React from 'react'
import { FlexboxGrid } from 'rsuite'
import './ShortArticles.css'

import fakeImg from '../img/IMG_1400.png'
import FrecciaArticoli from '../img/Untitled_Artwork-22.png'
import { Link } from 'react-router-dom'

function ShortArticles({ articles, center, edit,  onArticleSelected}) {

    if (center)
        return (
            <div>
                <FlexboxGrid justify="center">
                    <div style={{ width: "300px", height: "310px", backgroundColor: "white", borderRadius: "15px" }}>
                        <FlexboxGrid justify="center">
                            <p style={{ padding: "15px", borderRadius: "180px", marginTop: "15px", backgroundColor: "#85acce", maxWidth: "255px" }}>{articles.title}</p>
                        </FlexboxGrid>
                        <FlexboxGrid justify="center">
                            <p style={{ margin: "20px", padding: "10px", color: "#2d2c40" }}>{articles.description}</p>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid>
                <FlexboxGrid justify="center">
                    <div style={{ border: "1px solid black", borderRadius: "10px", width: "180px", height: "60px", marginTop: "-35px", backgroundColor: "#2d2c40" }}>
                        <FlexboxGrid justify="center">
                            <Link to={`/post/${articles._id}`} style={{ marginTop: "11.5px", background: "none" }}>
                                <img src={FrecciaArticoli} className="frecciaArticles" />
                            </Link>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid>
            </div>
        )
    if (edit)
    return (
        <div style={{width: "300px"}} className="linkArticolo">
            <div style={{ width: "300px", height: "310px", backgroundColor: "#f3f3f3", borderRadius: "15px" }}>
                <FlexboxGrid justify="center">
                    <p style={{ padding: "15px", borderRadius: "180px", marginTop: "15px", backgroundColor: "#85acce", maxWidth: "255px" }}>{articles.title}</p>
                </FlexboxGrid>
                <FlexboxGrid justify="center">
                    <p style={{ margin: "20px", padding: "10px", color: "#2d2c40" }}>{articles.description}</p>
                </FlexboxGrid>
            </div>
            <FlexboxGrid justify="center">
                <div style={{ border: "1px solid black", borderRadius: "10px", width: "180px", height: "60px", marginTop: "-35px", backgroundColor: "#2d2c40" }}>
                    <FlexboxGrid justify="center">
                        <Link to='#' onClick={e => onArticleSelected(e.target.id)} style={{ marginTop: "11.5px", background: "none" }}>
                            <img id={articles._id} src={FrecciaArticoli} className="frecciaArticles" />
                        </Link>
                    </FlexboxGrid>
                </div>
            </FlexboxGrid>
        </div>
    )
    else
        return (
            <div style={{width: "300px"}} className="linkArticolo">
                <div style={{ width: "300px", height: "310px", backgroundColor: "#f3f3f3", borderRadius: "15px" }}>
                    <FlexboxGrid justify="center">
                        <p style={{ padding: "15px", borderRadius: "180px", marginTop: "15px", backgroundColor: "#85acce", maxWidth: "255px" }}>{articles.title}</p>
                    </FlexboxGrid>
                    <FlexboxGrid justify="center">
                        <p style={{ margin: "20px", padding: "10px", color: "#2d2c40" }}>{articles.description}</p>
                    </FlexboxGrid>
                </div>
                <FlexboxGrid justify="center">
                    <div style={{ border: "1px solid black", borderRadius: "10px", width: "180px", height: "60px", marginTop: "-35px", backgroundColor: "#2d2c40" }}>
                        <FlexboxGrid justify="center">
                            <Link to={`/post/${articles._id}`} style={{ marginTop: "11.5px", background: "none" }}>
                                <img src={FrecciaArticoli} className="frecciaArticles" />
                            </Link>
                        </FlexboxGrid>
                    </div>
                </FlexboxGrid>
            </div>
        )
}

export default ShortArticles

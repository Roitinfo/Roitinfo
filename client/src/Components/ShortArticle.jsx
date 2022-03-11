import React from 'react'
import { FlexboxGrid } from 'rsuite'
import './ShortArticle.css'

import FrecciaArticoli from '../img/Untitled_Artwork-22.png'
import { Link } from 'react-router-dom'

export default function ShortArticle({ article, center, edit, onArticleSelected }) {

    //si assicura che il titolo dell'articolo sia minore di trent'uno caratteri
    if (article.title.length > 31) {
        article.title = article.title.slice(0, 31) + "...";
    }

    return (
        <div>
            <FlexboxGrid justify="center">
                <div style={{ width: "300px", height: "310px", backgroundColor: "white", borderRadius: "15px" }}>
                    <FlexboxGrid justify="center">
                        <p style={{ padding: "15px", borderRadius: "180px", marginTop: "15px", backgroundColor: "#85acce", width: "225px", textAlign: "center" }}>{article.title}</p>
                    </FlexboxGrid>
                    <FlexboxGrid justify="center">
                        <p style={{ margin: "20px", padding: "10px", color: "#2d2c40" }}>{article.description}</p>
                    </FlexboxGrid>
                </div>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <div style={{ border: "1px solid black", borderRadius: "10px", width: "180px", height: "60px", marginTop: "-35px", backgroundColor: "#2d2c40" }}>
                    <FlexboxGrid justify="center">
                        <Link to='#' onClick={e => onArticleSelected(e.target)} style={{ marginTop: "11.5px", background: "none" }}>
                            <img id={article._id} src={FrecciaArticoli} className="frecciaArticles" />
                        </Link>
                    </FlexboxGrid>
                </div>
            </FlexboxGrid>
        </div>
    )
}
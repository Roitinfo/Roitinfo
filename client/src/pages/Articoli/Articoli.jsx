import React from 'react'

import './Articoli.css'

import ScegliPost from 'components/ScegliPost'

import SfondoScrittaArticoli from 'img/Untitled_Artwork-11.png'
import ScrittaArticoli from 'img/Untitled_Artwork-12.png'

import { FlexboxGrid } from 'rsuite'

export default function Articoli({history}) {
    return (
        <div>
            <div style={{ position: "relative", top: "30px" }}>
                <FlexboxGrid justify="center">
                    <img src={SfondoScrittaArticoli} style={{ width: "400px" }} />
                    <img src={ScrittaArticoli} style={{ width: "200px", marginLeft: "-300px", marginTop: "9px" }} />
                </FlexboxGrid>
            </div>
            <ScegliPost onArticleSelected = {post => {history.push("/post/" + post.id)}}></ScegliPost>
        </div>
    )
}

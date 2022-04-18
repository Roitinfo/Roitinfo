import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import Header from './Header'
import Pagination from './Pagination'
import ShortArticles from './ShortArticle'
import classNames from 'classnames'
import ScegliPost from './ScegliPost'


import './Articoli.css'

import Sfondo from '../img/sfondo_page_articoli.png'
import SfondoScrittaArticoli from '../img/Untitled_Artwork-11.png'
import ScrittaArticoli from '../img/Untitled_Artwork-12.png'
import Scritta from '../img/IMG_1408.png'
import Lente from '../img/IMG_1409.png'

import { FlexboxGrid } from 'rsuite'

export default function Articoli({history}) {
    return (
        <div>
            <Header />
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

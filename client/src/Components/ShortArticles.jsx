import React from 'react'
import { FlexboxGrid } from 'rsuite'

import fakeImg from '../img/IMG_1400.png'

function ShortArticles() {
    return (
        <div>
            <FlexboxGrid justify="center">
                <img src={fakeImg} style={{ width: "300px", height: "310px" }} />
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <div style={{ border: "1px solid black", borderRadius: "10px", width: "230px", height: "90px", marginTop: "-50px" }}>

                </div>
            </FlexboxGrid>
        </div>
    )
}

export default ShortArticles

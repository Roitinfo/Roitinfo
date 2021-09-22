import React, { useState, useRef, useEffect, useContext } from 'react'
import ShortArticles from './ShortArticles'
import './Carousel.css'
import { FlexboxGrid, Input, InputGroup } from 'rsuite'
import classNames from 'classnames'
import AuthContext from '../Context/AuthContext'
import axios from 'axios'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import FreccaDestra from '../img/IMG_1404.png'
import FreccaSinistra from '../img/IMG_1405.png'
import Lente from '../img/IMG_1409.png'
import Scritta from '../img/IMG_1408.png'

function Carousel() {

    const [tags, setTags] = useState()
    const [filterTags, setFilterTags] = useState([])
    const slider = useRef()
    const [slidesToShow, setSlidesToShow] = useState(3)

    const { urlServer } = useContext(AuthContext)

    useEffect(() => {
        axios.post(`${urlServer}/tag/all`).then(res => {
            setTags(res.data[0].tags)
        })
    }, [])


    function changeInput(e) {

        e = e.target.value

        setFilterTags(tags.filter(el => el.includes(e)))

        if (e === '')
            setFilterTags([])
    }

    useEffect(() => {
        console.log("filterTags", filterTags)
    }, [filterTags])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1
    }

    const [search, setSearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [selectTags, setSelectTags] = useState([])

    const [selectArticles, setSelectArticles] = useState([])

    const aggiungiTag = (e) => {
        e = e.target.id

        if (!selectTags.includes(e)) {
            setSelectTags(el => [...el, e])
            setSearchValue('')
            setFilterTags([])
            
            setSearch(false)
        }
    }

    useEffect(() => {
        axios.post(`${urlServer}/post/search/tag`, { tags: selectTags }).then(res => {

            //limita gli articoli a 10
            setSelectArticles(res.data.filter((el, inde) => inde < 10))

            if (res.data.filter((el, inde) => inde < 10).length === 2) {
                setSlidesToShow(2)
            } else if (res.data.filter((el, inde) => inde < 10).length === 1) {
                setSlidesToShow(1)
            }
        })

        console.log("selectTags", selectArticles)
    }, [selectTags])


    //impedisce che la scritta "No data" appiai più volte
    useEffect(() => {
        if (selectArticles.length === 0)
            setSlidesToShow(1)
        else if (selectArticles.length === 2)
            setSlidesToShow(2)
        else
            setSlidesToShow(3)
    }, [selectArticles])


    return (
        <div style={{ border: "1px solid black", width: "100%", height: "700px", overflow: "hidden", backgroundColor: "orange" }}>
            <FlexboxGrid justify="center">
                <div style={{ width: "250px", padding: "10px", borderRadius: "10px", marginTop: "20px", backgroundColor: "white" }}>
                    <button style={{ background: "none", padding: "0px" }}><img src={Lente} style={{ width: "25px", height: "25px" }} /></button>
                    <img className={classNames({ dontShow: search, searchShow: true })} src={Scritta} style={{ width: "180px", height: "30px", marginTop: "4px", marginLeft: "10px" }} />
                </div>
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <input onChange={(e) => { setSearchValue(e.target.value); changeInput(e) }} onBlur={() => {
                    if (searchValue === '')
                        setSearch(false)
                }} onFocus={() => setSearch(true)} style={{ fontSize: "20px" }} id="searchArticles" value={searchValue} />
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <div id="boxTags">
                    {
                        filterTags.map(e => {

                            let prova = false;

                            setTimeout(() => prova = true, 1000)


                            return (
                                <button onClick={el => aggiungiTag(el)} className={classNames({ selectTag: true, animationTag: prova })} id={e}>{e}</button>
                            )
                        })
                    }
                </div>
            </FlexboxGrid>

            <FlexboxGrid justify="center">
                <div style={{ border: "1px solid black", width: "auto", padding: "10px" }}>
                    {
                        selectTags.map(el => {
                            return (
                                <div style={{ display: "inline" }}>
                                    <button onClick={e => setSelectTags(selectTags.filter(ta => ta !== e.target.id))} id={el}>
                                        x
                                    </button>
                                    {el}
                                </div>
                            )
                        })
                    }
                </div>
            </FlexboxGrid>

            <Slider ref={c => slider.current = c} {...settings} style={{ marginTop: "10px" }}>
                {
                    selectArticles.length > 0 ? selectArticles.map(el => {
                        return (
                            <div key={1} className="element">
                                <ShortArticles />
                            </div>
                        )
                    }) : <div key={1} className="element">
                        <FlexboxGrid justify="center">
                            <p>no data</p>
                        </FlexboxGrid>
                    </div>
                }
            </Slider>
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                <button className="button" onClick={() => slider.current.slickPrev()} style={{ marginTop: "40px", background: "none", marginRight: "10px" }}>
                    <img className="btnFreccia" src={FreccaSinistra} />
                </button>
                <button className="button" onClick={() => slider.current.slickNext()} style={{ background: "none" }}>
                    <img className="btnFreccia" src={FreccaDestra} />
                </button>
            </div>
        </div>
    )
}

export default Carousel

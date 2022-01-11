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

import FreccaDestra from '../img/Untitled_Artwork-28.png'
import FreccaSinistra from '../img/Untitled_Artwork-29.png'
import Scritta from '../img/IMG_1408.png'
import Lente from '../img/IMG_1409.png'
import outlineSearchInput from '../img/Untitled_Artwork-33.png'
import noDataArticles from '../img/Untitled_Artwork-39.png'
import scrittaNoDataArticles from '../img/Untitled_Artwork-40.png'
import backgroundEquazioniCarousel from '../img/Untitled_Artwork-17.png'

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
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 956,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
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
        if (selectArticles.length === 1 || selectArticles.length === 0)
            setSlidesToShow(1)
        else if (selectArticles.length === 2)
            setSlidesToShow(2)
        else
            setSlidesToShow(3)

        console.log("è cambiato guarda", selectArticles.length)
    }, [selectArticles])

    const [showBoxTags, setShowBoxTags] = useState(true)
    const [cambioZIndex, setCambioZIndex] = useState(2)

    useEffect(() => {
        if (searchValue === '' || filterTags.length === 0) {
            setShowBoxTags(true)
            setCambioZIndex(3)
        } else {
            setShowBoxTags(false)
            setCambioZIndex(0)
        }
    }, [searchValue])


    return (
        <div style={{ width: "100%", height: "650px", backgroundColor: "#ffe9e5", overflow: "hidden" }}>
            <div style={{ position: "relative", zIndex: 1, marginTop: "20px" }}>
                <FlexboxGrid justify="center">
                    <div style={{ width: "250px", padding: "10px", borderRadius: "10px", marginTop: "20px", backgroundColor: "white" }}>
                        <img src={Lente} style={{ width: "25px", height: "25px" }} />
                        <img src={Scritta} id="searchShow" className={classNames({ dontShow: search })} style={{ width: "180px", height: "30px", marginTop: "4px", marginLeft: "10px", position: "relative", zIndex: "2", transition: "all 0.3s" }} />
                    </div>
                </FlexboxGrid>

                {/* Barra di ricerca */}
                <FlexboxGrid justify="center">
                    <input autoComplete="off" onChange={(e) => { setSearchValue(e.target.value); changeInput(e) }} onBlur={() => {
                        if (searchValue === '')
                            setSearch(false)

                        setShowBoxTags(true)
                    }} onFocus={() => {
                        setSearch(true)

                        if (searchValue !== '')
                            setShowBoxTags(false)
                    }} style={{ fontSize: "20px", position: "relative", zIndex: "4", background: "none" }} className="searchArticles" value={searchValue} />
                </FlexboxGrid>

                <FlexboxGrid justify="center" style={{ position: "relative", zIndex: "1" }}>
                    <div id="boxTags" className={classNames({ dontShow: showBoxTags })}>
                        {
                            filterTags.map(e => {

                                return (
                                    <button onClick={el => aggiungiTag(el)} className={classNames({ selectTag: true })} id={e}><b id={e}>#{e}</b></button>
                                )
                            })
                        }
                    </div>
                </FlexboxGrid>

                <FlexboxGrid justify="center">
                    <div style={{ width: "auto", padding: "10px", position: "relative", top: "-100px", backgroundColor: "white", borderRadius: "180px", paddingLeft: "15px", paddingRight: "5px" }}>
                        {
                            selectTags.map(el => {
                                return (
                                    <div style={{ display: "inline", backgroundColor: "#ffe9e5", padding: "5px", borderRadius: "180px", marginRight: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
                                        <b>#{el}</b>
                                        <button style={{ background: "none", position: "relative", zIndex: cambioZIndex, top: "-1px", fontSize: "15px", padding: "1px", paddingLeft: "5px", paddingRight: "5px", paddingBottom: "2px", marginLeft: "6px", height: "24px", backgroundColor: "#2d2c40", color: "white", borderRadius: "20px", outline: "none" }} onClick={e => { setSelectTags(selectTags.filter(ta => ta !== e.target.id)); console.log("cliccato") }} id={el}>
                                            x
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </FlexboxGrid>

                <div style={{ marginTop: "-80px", height: "350px" }}>
                    <Slider ref={c => slider.current = c} {...settings} style={{ position: "relative", zIndex: "0" }}>
                        {
                            selectArticles.length > 0 ? selectArticles.map(el => {
                                return (
                                    <div key={1} className="element">
                                        <ShortArticles articles={el} center={true} />
                                    </div>
                                )
                            }) : <div key={1} className="element">
                                <FlexboxGrid justify="center">
                                    <img src={noDataArticles} style={{ width: "340px", borderRadius: "20px" }} />
                                </FlexboxGrid>
                                <FlexboxGrid justify="center">
                                    <img src={scrittaNoDataArticles} style={{ width: "250px", marginTop: "20px" }} />
                                </FlexboxGrid>
                            </div>
                        }
                    </Slider>
                </div>



                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                    <button className="button" onClick={() => slider.current.slickPrev()} style={{ marginTop: "40px", background: "none", marginRight: "10px" }}>
                        <img className="btnFreccia" src={FreccaSinistra} />
                    </button>
                    <button className="button" onClick={() => slider.current.slickNext()} style={{ background: "none" }}>
                        <img className="btnFreccia" src={FreccaDestra} />
                    </button>
                </div>

            </div>
            <img src={backgroundEquazioniCarousel} style={{ position: "relative", top: "-570px", width: "100%", height: "100%", zIndex: "0", opacity: "60%" }} />
        </div>
    )
}

export default Carousel

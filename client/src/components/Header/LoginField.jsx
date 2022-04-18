import React, {useState} from 'react'
import classNames from 'classnames'
import backgroundInput from '../../img/IMG_1417.png'

export default function LoginField({type, onChange, fieldImg})
{
    let [value, setValue] = useState("")
    let [showImg, setShowImg] = useState(true);
    if (value != "" && showImg) setShowImg(false);
    return <div className="sizeBoxInput" >
            <img src={backgroundInput} style={{ width: "100%", height: "45px" }} />
            <img src={fieldImg} className={classNames({ dontShow: !showImg})} style={{height: "20px", marginTop: "-69px", marginLeft: "20px", transition: "all 0.3s" }} />
            <input type={type} onBlur={() => {
                if (value === '')
                    setShowImg(true)
                }} onFocus={() => setShowImg(false)} className="inputEmail" style={{ fontSize: "20px", paddingLeft: "20px" }} onChange={e => {setValue(e.target.value); onChange(e)}}/>
        </div>
}
import React from "react";
import {FaBullhorn}     from 'react-icons/fa';
import style from  "./stub.scss"
export default function Stub() {
    return (
        <div className={style["stub"]}>
            <FaBullhorn className={style["bullhorn"]}/>
            <p>выберите аннонс</p>
        </div>
    )
}
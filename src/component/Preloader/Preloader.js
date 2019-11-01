import React from "react";
import style from "./preloader.scss"

export default function Preloader({isLoading}) {

    if(isLoading) {
        return (
            <div className={style["wrap"]}>
                <div className={style["lds-ring"]}><div/><div/><div/><div/></div>
            </div>
        )
    }
    return null

}
import React from "react";
import style from "./status.scss"

export default function Status({status}) {
    return (
        <span className={status ? style["publish"] : status !== null ? style["no-publish"] : style["removed-publish"]}>
            {status ? "Опубликован" : status !== null ? "Не опубликован" : "Снят с публикации"}
        </span>
    )
}
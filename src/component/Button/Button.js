import  React     from "react";
import classNames from "classnames"
import style from  "./button.scss"

// type button = [success, error, full]
export default function Button(props) {
    const classesButton = classNames({
        [style["button"]]: true,
        [style[`${props.type}`]] : true
    });
    return (
        <button
            className={classesButton}
            onClick={props.action}>
            {props.children}
        </button>
    )
}
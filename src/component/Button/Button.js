import  React     from "react";
import classNames from "classnames"
import "./button.scss"

// type button = [success, error, full]
export default function Button(props) {
    const classesButton = classNames({
        button: true,
        [`${props.type}`] : true
    });
    return (
        <button
            className={classesButton}
            onClick={props.action}>
            {props.children}
        </button>
    )
}
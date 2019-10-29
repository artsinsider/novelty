import React   from "react";
import * as FA from "react-icons/fa";
import style from "./radio.scss";

export default class Radio extends React.PureComponent {

    changeChecked = (value) => this.props.action(this.props.name, value);

    render() {
        return (
            this.props.value.map( check => {
                return (
                    <div className={style["radio-group"]} onClick={() =>this.changeChecked(check)} key={check + "_check"}>
                        {check === this.props.defaultValue ? <FA.FaCheckCircle/> :  <FA.FaCircle/>}
                        <p className={style["radio-name"]}>{check.toLocaleUpperCase()}</p>
                    </div>
                )
            })
        )
    }
}

import React   from "react";
import * as FA from "react-icons/fa";
import style from "./checkbox.scss";

export default class Checkbox extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            check: props.checked
        };
    }


    changeChecked = () => {
        const{name, action, value} = this.props;
        this.setState({check: !this.state.check});
        action(name, {value, checked: !this.state.check})
    };

    render() {
        return (
            <div className={style["check-group"]} onClick={this.changeChecked}>
                {this.state.check ? <FA.FaCheckSquare/>  : <FA.FaSquare/>}
                <p className={style["check-name"]} >{this.props.children}</p>
            </div>
        )
    }
}
import React   from "react";
import * as FA from "react-icons/fa";
import "./checkbox.scss";

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
            <div className="check-group" onClick={this.changeChecked}>
                {this.state.check ? <FA.FaCheckSquare/>  : <FA.FaSquare/>}
                <p className="check-name" >{this.props.children}</p>
            </div>
        )
    }
}
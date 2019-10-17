import React        from 'react';
import classnames   from 'classnames';
import moment   from 'moment';
import {Scrollbars} from 'react-custom-scrollbars';
import Stub         from "../Stub/Stub"
import './whats-new.scss'

export default class WhatsNew extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isTopHeader: false,
            maxHeight: 0,
        };
    }

    componentDidMount() {
        if(document.querySelector(".whats-new")) {
            this.setState({maxHeight: document.querySelector(".whats-new").clientHeight});
        }
        localStorage.setItem("nov", JSON.stringify([]))
    }

    /** Cохранение состояния прокрутки для использования её календарём */
    onScroll = () => {
        if(this.refs.whatsNew) {
            let scroll = this.refs.whatsNew.getScrollTop();
            this.setState(() =>({isTopHeader: scroll > 0}));
        }
    };

    render() {
        const {isTopHeader, maxHeight} = this.state;
        const {announce, active} = this.props;
        const headerClassNames = classnames({
            "header-novelty" : true,
            collapse: isTopHeader
        });

        return(
            <>
                {active === null ? <Stub/> : null}
                <div className="whats-new">
                    <div className={headerClassNames}>Что нового?</div>
                    <Scrollbars
                        ref="whatsNew"
                        autoHeight
                        autoHeightMin={100}
                        autoHeightMax={maxHeight ? isTopHeader ? maxHeight - 66 : maxHeight - 66 : 0}
                        onScroll={this.onScroll}
                    >
                        {announce &&
                            <div className="container-novelty">
                                <h1>{announce.title}</h1><span className="time-novelty">{announce.time ? moment(announce.time ).format("DD.MM.YYYY") : ""}</span>
                                <div key={announce.id} className="novelty" dangerouslySetInnerHTML={{__html: announce.content}}/>
                                <div className="line"/>
                            </div> }
                    </Scrollbars>
                </div>
            </>
        )
    }
}
import React        from 'react';
import classnames   from 'classnames';
import moment       from 'moment';
import {Scrollbars} from 'react-custom-scrollbars';
import Stub         from "../Stub/Stub"
import style        from "./whatsNew.scss";

export default class WhatsNew extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isTopHeader: false,
            maxHeight: 0,
        };
    }

    componentDidMount() {
        if(document.querySelector("."+style["whats-new"])) {
            this.setState({maxHeight: document.querySelector("."+style["whats-new"]).clientHeight});
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
            [style["header-novelty"]] : true,
            [style["collapse"]]: isTopHeader
        });

        return(
            <>
                {active === null ? <Stub/> : null}
                <div className={style["whats-new"]}>
                    <div className={headerClassNames}>Что нового?</div>
                    <Scrollbars
                        ref="whatsNew"
                        className={style["scroll_bars"]}
                        autoHeight
                        autoHeightMin={100}
                        autoHeightMax={maxHeight ? isTopHeader ? maxHeight - 66 : maxHeight - 66 : 0}
                        onScroll={this.onScroll}
                    >
                        {announce &&
                            <div className={style["container-novelty"]}>
                                <h1>{announce.title}</h1><span className={style["time-novelty"]}>{announce.time ? moment(announce.time * 1000 ).format("DD.MM.YYYY") : ""}</span>
                                <div key={announce.id} className={style["novelty"]} dangerouslySetInnerHTML={{__html: announce.content}}/>
                                <div className={style["line"]}/>
                            </div> }
                    </Scrollbars>
                </div>
            </>
        )
    }
}
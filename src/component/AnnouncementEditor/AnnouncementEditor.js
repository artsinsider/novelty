import React        from 'react';
import ReactQuill   from 'react-quill';
import DateTime     from 'react-datetime';
import moment       from 'moment'
import Button       from "../Button/Button";
import Checkbox     from "../Checkbox/Checkbox";
import Radio        from "../Radio/Radio";
import { Contexts}  from "../../test/Wrapper"
import style        from "./editor.scss"

export default class AnnouncementEditor extends React.PureComponent{
    static contextType = Contexts;
    constructor (props) {
        super(props);
        this.state = {
            editorHtml: props.announce.content,
            theme: 'snow',
            check: false,
            date: props.announce.time,
            valid: {}
        }
    }

    handleChange = (html) => {
        this.setState({ editorHtml: html });
        this.props.changeAnnouncement("content" ,html)
    };

    publishNovelty = (id, prop) => () => {
        const validateFields = AnnouncementEditor.validateFields(this.props.announce);
        if(!Object.keys(validateFields).length) {
            if(this.props.announce && prop !== null) {
                this.props.publishNovelty(id, true);
                return
            }
            this.props.publishNovelty(id, prop);
            this.setState({valid: null})
        } else {
            this.setState({valid: validateFields})
        }
    };

    getFromTime = (e) => {
        this.setState(() => ({date: e}));
        this.props.changeAnnouncement("time", +e.unix() * 1000);
    };

    validFrom = (current, selectedDate) => !current.isBefore(this.state.date, 'day') && !current.isBefore(moment(new Date()), 'day');

    render() {
        const {changeAnnouncement, announce} = this.props;
        const {title ="", role=["employee"], locale="ru", publish=false, id="empty"} = announce;
        const dateToProps = {
            className: 'date',
            placeholder: "Дата публикации",
            readOnly: true,
            id: 'date'
        };

        return (
            <div className={style["container-editor"]}>
                <div className={style["title"]}>
                    <span className={style["main-title"]}>
                        <label htmlFor="title-text">Заголовок аннонса</label>
                        <input name="title" id="title-text" value={title} className={style["title-text"]} type="text" onChange={(e) => changeAnnouncement(e.target.name, e.target.value)}/>
                        {this.state.valid.title && <div className={style["invalid"]} >Не указан заголовок бупликации</div>}
                    </span>
                    <span className={style["date"]}>
                        <label htmlFor="dates">Дата публикации</label>
                        <DateTime
                            className={style["date"]}
                            inputProps={dateToProps}
                            onChange={this.getFromTime}
                            value={moment(this.state.date)}
                            dateFormat={"DD.MM.YYYY"}
                            closeOnSelect={true}
                            timeFormat={false}
                            locale={"ru"}
                            isValidDate={this.validFrom}
                        />
                        {this.state.valid.time && <div className={style["invalid"]} >Не указана дата бупликации</div>}
                    </span>

                    <span className={style["role"]}>
                        <label htmlFor="role">Доступен ролям</label>
                        {this.context.roles.map(el => <Checkbox key={el.value} name="role" checked={role.includes(el.value)} action={changeAnnouncement} value={el.value} >{el.name}</Checkbox>)}
                    </span>

                    <span className={style["locale"]}>
                        <label htmlFor="locale">Язык аннонса</label>
                        <Radio name="locale" defaultValue={locale} action={changeAnnouncement} value={["ru","en"]} />
                    </span>
                </div>
                <div>
                    <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChange}
                        value={this.state.editorHtml}
                        modules={AnnouncementEditor.modules}
                        formats={AnnouncementEditor.formats}
                        bounds={'.editor'}
                        placeholder={this.props.placeholder}
                    />
                    {this.state.valid.content && <div className={style["invalid"]} >Необходимо описание аннонса</div>}
                </div>

                <Button  type="success" action={this.publishNovelty(id, false)} >Сохранить</Button>
                {!publish ?
                    <Button  type="success" action={this.publishNovelty(id, true)} >Сохранить и опубликовать</Button> :
                    <Button  type="error" action={this.publishNovelty(id, null)} >Снять с публикации</Button>
                }
                <Button type="full" action={this.props.toggleEditor} >Отменить</Button>
            </div>
        )
    }
}

AnnouncementEditor.filds = ['title', 'time', 'content'];

AnnouncementEditor.validateFields = (obj) => AnnouncementEditor.filds.filter(item => !obj[item]).reduce((a, b) => ({...a, [b]: true}), {});

/* Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
AnnouncementEditor.modules = {
    toolbar: [
        [{'header': '2'}], //{ 'header': '1'}, { 'font': [] }
        // [{size: []}],
        // ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}], // ,{'indent': '-1'}, {'indent': '+1'}
        ['link', 'image'], // , 'video'
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
};

AnnouncementEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];
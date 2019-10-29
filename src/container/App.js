import React, {createContext} from "react";
import {hot} from "react-hot-loader"
import WhatsNew from "../component/WhatsNew/WhatsNew"
import Announcement from "../component/Announcement/Announcement"
import Wrap from "../test/Wrapper"
import moment from "moment"
import appStyle from  "./app.scss"

const locale = 'ru';
moment.locale(locale);

const template = {
        id: "empty",
        title: "",
        time: "",
        content: "",
        role: ["employee"],
        locale: "ru",
        publish: null
    };
let list = [];

for (let i = 1; i <= 275; i++) {
    const ids = Math.floor(Math.random() * (100 + i));
    const item = {...template}
    const time = 1571920828 * 1000;
    const title = `Встречайте типограф. -- ${ids}`;
    const content = `<h2>
                        <strong>Улучшения</strong>
                     </h2>
                        <ul>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.Чтобы отобразить исходный редакционный текст, отключите типограф в меню пользователя.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Чтобы отобразить исходный редакционный текст, отключите типограф в меню пользователя.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Мы автоматически расставили кавычки, дефисы и тире в соответствии с нормами экранной типографики — это повысит удобство чтения новостей.</li>
                            <li>Чтобы отобразить исходный редакционный текст, отключите типограф в меню пользователя.</li>
                        </ul>
                        <h2>
                            <strong>Исправленны ошибки</strong>
                        </h2>
                        <ul>
                            <li>Исправлена ​​ошибка, при которой вы не могли правильно объединить две маленькие фигуры, если они содержали перекрывающиеся кривые.</li>
                            <li>Исправлена ​​редкая ошибка, когда прототипы не воспроизводились, как ожидалось, в Sketch Cloud</li>
                            <li>Исправлена ​​ошибка, при которой неправильный курсор отображался после поворота слоя</li>
                            <li>Исправлена ​​ошибка, при которой изменение размера текстового слоя не изменяло бы его содержимое внутри</li>
                        </ul>`
    item.title = title;
    item.id = ids;
    item.time = time;
    item.content = content;
    item.role = ["employee"];
    item.locale = "ru";
    item.publish = i % 2 !== 0 ? true : i % 3 !== 0 ? null : false;
    list.push(item)
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAnnounce: [...list],
            active: null,
            openEditor: false,
            announce: {...template}
        };
    }

    selectAnnouncement = (id) => {
        this.setState((state) => ({active: id}))
    };

    editAnnouncement = (id) => {
        this.setState((state) => ({openEditor: !state.openEditor, announce: state.listAnnounce.filter(item => item.id === id)[0], active: id }))
    };

    changeAnnouncement = (name, data) => {
        let changeData = data;
        if(name === "role") {
            if(!data.checked) {
                changeData = this.state.announce.role.filter( item => item !== data.value)
            } else {
                changeData = [...this.state.announce.role, data.value]
            }
        }

        this.setState(state => ({announce: {...state.announce, [name]: changeData}}))
    };

    toggleEditor = () => this.setState((state) => ({active: state.openEditor ? null :"empty", openEditor: !state.openEditor, announce: {...template}}));

    publishNovelty = (id, prop) => {
        if(id === "empty") {
            const newId = "cr_" + Math.floor(Math.random() * 100);
            const newListAnnounce = [{...this.state.announce, id: newId, publish: prop}, ...this.state.listAnnounce];
            this.setState((state) => (
                {
                    openEditor: !state.openEditor,
                    announce: {...template},
                    listAnnounce: newListAnnounce,
                    active: newId
                }));
            return
        }

        let updateAnnounce = {...this.state.announce};
        updateAnnounce.publish = prop;
        this.setState((state) => (
            {
                openEditor: !state.openEditor,
                announce: {...template},
                listAnnounce: state.listAnnounce.map(item =>  item.id === id ? updateAnnounce : item),
                active: id
            }));
    };

    render() {
        const {listAnnounce, active, openEditor, announce} = this.state;
        const activeIndex = listAnnounce.findIndex(el => el.id === active) ;
        const announces = activeIndex !== -1 &&!openEditor ? listAnnounce[activeIndex] : announce;

        return (
            <>
                <div className={appStyle["header"]}>Аннонсы</div>
                <div className={appStyle["container"]}>
                    <Announcement
                        announcement={listAnnounce}
                        active={activeIndex < 0 ?  null : activeIndex}
                        selectAnnouncement={this.selectAnnouncement}
                        editAnnouncement={this.editAnnouncement}
                        toggleEditor={this.toggleEditor}
                        publishNovelty={this.publishNovelty}
                        changeAnnouncement={this.changeAnnouncement}
                        openEditor={openEditor}
                        announce={announces}
                    />

                        <WhatsNew
                            lang={locale}
                            active={active}
                            announce={announces}
                            toggleEditor={this.toggleEditor}
                        />

                </div>
            </>
        );
    }
}

export default hot(module)(Wrap(App));
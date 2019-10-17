import React                    from 'react'
import {FaEdit}                 from 'react-icons/fa';
import {Column,Table,AutoSizer} from 'react-virtualized';
import ModalEdit                from '../Modal/Modal';
import Button                   from "../Button/Button";
import moment                   from "moment";
import 'react-virtualized/styles.css'; // only needs to be imported once
import "./announcement.scss"

export default class Announcement extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            active: null
        };
    }

    selectAnnouncement = (id, action) => () => this.props.editAnnouncement(id, action);

    render() {
        const {announcement, active = null, selectAnnouncement} = this.props;

        return (
            <div className="announcement-container">
                <Button type="success" action={this.props.toggleEditor}>
                    Добавить аннонс
                </Button>
                <hr/>
                 <ModalEdit
                     announce={this.props.announce}
                     openEditor={this.props.openEditor}
                     toggleEditor={this.props.toggleEditor}
                     publishNovelty={this.props.publishNovelty}
                     changeAnnouncement={this.props.changeAnnouncement}
                 />
                <AutoSizer>
                    {({height, width}) =>
                        <Table
                            width={width}
                            height={height - 50}
                            headerHeight={50}
                            rowHeight={50}
                            rowCount={announcement.length}
                            rowGetter={({ index }) => announcement[index]}
                            onRowClick={(data) => selectAnnouncement(data.rowData.id)}
                            rowClassName={({index}) => active === index ? 'active' : '' }
                        >
                            <Column
                                label='Аннонсы'
                                dataKey='title'
                                width={Math.trunc(width * .5)}
                            />
                            <Column
                                width={150}
                                label='Дата выпуска'
                                dataKey='time'
                                cellRenderer={({cellData}) => <span className="cell" >{moment(cellData).format("DD.MM.YYYY")}</span> }
                            />
                            <Column
                                width={200}
                                label='Роли'
                                dataKey='role'
                                cellRenderer={(data) => <span className="cell" >{data.cellData.join(", ")}</span> }
                            />
                            <Column
                                width={100}
                                label='Язык'
                                dataKey='locale'
                                cellRenderer={({cellData}) => <span className="cell" >{cellData}</span>}
                            />
                            <Column
                                width={150}
                                label='Опубликован'
                                dataKey='publish'
                                cellRenderer={(data) => (
                                    <span className={data.cellData ? "publish" : data.cellData !== null ? "no-publish" : "removed-publish"}>
                                        {data.cellData ? "Опубликован" : data.cellData !== null ? "Не опубликован" : "Снят с публикации"}
                                    </span>
                                )}
                            />
                            <Column
                                width={50}
                                label='Ред.'
                                dataKey='edit'
                                cellRenderer={(data) => (
                                    <FaEdit onClick={this.selectAnnouncement(data.rowData.id, "edit")} className="icon"/>
                                )}
                            />
                        </Table>
                    }
                </AutoSizer>
            </div>

        )
    }
}
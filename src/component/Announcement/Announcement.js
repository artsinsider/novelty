import React                    from 'react'
import {FaEdit}                 from 'react-icons/fa';
import {Column,Table,AutoSizer} from 'react-virtualized';
import Button                   from "../Button/Button";
import Status                   from "../Status/Status";
import moment                   from "moment";
import styles                   from "./announcement.scss"

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
            <div className={styles["announcement-container"]}>
                <Button type="success" action={this.props.toggleEditor}>
                    Добавить аннонс
                </Button>
                <hr/>

                <AutoSizer>
                    {({height, width}) =>
                        <Table
                            width={width}
                            height={height - 90}
                            headerHeight={50}
                            rowHeight={50}
                            rowCount={announcement.length}
                            rowGetter={({ index }) => announcement[index]}
                            onRowClick={(data) => selectAnnouncement(data.rowData.id)}
                            rowClassName={({index}) => active === index ? styles['active'] : '' }
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
                                cellRenderer={({cellData}) => <span className={styles["cell"]} >{moment(cellData * 1000).format("DD.MM.YYYY")}</span> }
                            />
                            <Column
                                width={200}
                                label='Роли'
                                dataKey='role'
                                cellRenderer={(data) => <span className={styles["cell"]} >{data.cellData.join(", ")}</span> }
                            />
                            <Column
                                width={50}
                                label='Язык'
                                dataKey='locale'
                                cellRenderer={({cellData}) => <span className={styles["cell"]} >{cellData}</span>}
                            />
                            <Column
                                width={150}
                                label='Опубликован'
                                dataKey='publish'
                                cellRenderer={({cellData}) => <Status status={cellData}/>}
                            />
                            <Column
                                width={50}
                                label='Ред.'
                                dataKey='edit'
                                cellRenderer={(data) =>
                                <span className={styles["cell"]} onClick={this.selectAnnouncement(data.rowData.id, "edit")} ><FaEdit className="icon"/></span>
                                }
                            />
                        </Table>
                    }
                </AutoSizer>
            </div>

        )
    }
}
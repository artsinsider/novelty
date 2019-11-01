import React              from 'react';
import Modal              from 'react-modal';

import style from "./modal.scss"

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app');

export default class  ModalEdit extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
                <Modal
                    isOpen={this.props.openEditor}
                    contentLabel="Minimal Modal Example"
                    className={style["Modal"]}
                    overlayClassName="Overlay"
                >

                </Modal>
        );
    }
}


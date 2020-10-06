import React from 'react';
import { Modal } from 'react-bootstrap';

/**
 * Displayed when a comment is empty.
 * Called in AddComment.js
 * 
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class EmptyTextModal extends React.Component {
    render(){
        return (
            <Modal className="etm-modal" show={this.props.show} onHide={this.props.onHide} animation={false} size='sm' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className="etm-modal__header" closeButton>
                <Modal.Title className="etm-modal__title">Text is empty</Modal.Title>
            </Modal.Header>
                <Modal.Body className="etm-modal__body">
                    <div className='etm-modal__body--container'>
                        Comment cannot be an empty text.
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default EmptyTextModal;
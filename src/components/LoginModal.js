import React from 'react';
import { Modal } from 'react-bootstrap';

class LoginAlertModal extends React.Component {
    render() {
        return (
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            animation={false}
            size="sm" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Please Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please log in before you create a card.
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoginAlertModal;
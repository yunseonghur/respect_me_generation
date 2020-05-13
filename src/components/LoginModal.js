import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class LoginModal extends React.Component {
    render() {
        return (
            <Modal
            show={this.props.show}
            animation={false}
            size="sm" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered>
                <Modal.Header>
                    <Modal.Title>Please Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please log in before you create a card.
                </Modal.Body>
                <Modal.Footer id="footer">
                    <Button className="modal-btn" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default LoginModal;
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

/**
 * Shows when non-users want to access user-only functionality.
 * 
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class LoginAlertModal extends Component {
    render() {
        return (
            <Modal
            className="login-modal"
            show={this.props.show}
            onHide={this.props.onHide}
            animation={false}
            size="sm" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered>
                <Modal.Header className="login-modal__header" closeButton>
                    <Modal.Title className="login-modal__header--title">Please Login</Modal.Title>
                </Modal.Header>
                <Modal.Body className="login-modal__body">
                    Please log in before contributing to the community!<br/>
                    <Nav.Link style={{fontSize: "10pt", fontWeight: "600", border: "1px solid black", borderRadius: "15px", textAlign: "center"}} 
                        className="login-model__body--nav" href='#/login'>Login</Nav.Link>
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoginAlertModal;
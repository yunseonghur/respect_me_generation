import React from 'react';
import { Modal } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

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
                    Please log in before contributing to the community!<br/>
                    <Nav.Link style={{fontSize: "10pt", fontWeight: "600", border: "1px solid black", borderRadius: "15px"}} 
                        className="loginnav" href='#/login'>Login</Nav.Link>
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoginAlertModal;
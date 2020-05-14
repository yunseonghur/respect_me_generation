import React from 'react';
import { Modal } from 'react-bootstrap';

class TextLengthModal extends React.Component {

    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} animation={false} size='sm' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Text is too long</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            Text has to be less than {this.props.textLength} characters.
                        </div>
                    </Modal.Body>
            </Modal>
        )
    }
};

export default TextLengthModal;
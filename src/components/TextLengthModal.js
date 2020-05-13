import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class TextLengthModal extends React.Component {

    render(){
        return (
            <Modal show={this.props.show} animation={false} size='md' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>Text is too long</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            Text has to be less than 75 characters.
                        </div>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};

export default TextLengthModal;
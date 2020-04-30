import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

class AddComment extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Comment
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    TODO: comment form
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

export default AddComment;
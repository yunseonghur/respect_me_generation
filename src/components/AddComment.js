import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

class AddComment extends Component {

    state = {
        visible: false
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(event.target.Comments.value)
    }

    render(){
        return(
            <div>
            <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Comments</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className='container'>
                      <Row>
                          <Col sm={6}>
                              <Form onSubmit={this.handleSubmit}>
                                  <Form.Group controlId="Comments">
                                      <Form.Control
                                        type="text"
                                        name="Comments"
                                        required
                                        placeholder="add your comment here"
                                      />
                                  </Form.Group>
                                  <Form.Group>
                                      <Button type="submit">
                                          Add Comment
                                      </Button>
                                  </Form.Group>
                              </Form>
                          </Col>
                      </Row>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={ () => {
                    this.props.hideModal({ visible: false});
                    console.log("close")
    }               }>Close</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
        )
    }
}

// onClick={
//     ()=>{
//         this.setState({ visible: false});
//         console.log("close")
//     }
// }

export default AddComment;
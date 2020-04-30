import React, {Component} from 'react';
import MyCard from '../components/MyCard';
import {Modal, Card, Button, Row, Col, Form} from 'react-bootstrap';
import AddComment from '../components/AddComment';
// import "./Cards.css";

class Cards extends React.Component{

    state = {
        visible: false
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(event.target.Comments.value)
    }

    render() {

        return (
            <div className="deck">
               
                <Card style={{width: '18rem'}}>
                    <Button variant="primary" onClick={()=> this.setState({visible:true})}>
                        <Card.Img variant="top" src="https://i.pinimg.com/564x/83/f0/3a/83f03ac706568420b12b98ed22016650.jpg" />
                    </Button>
                    <Card.Body>
                        <Card.Title>Owner</Card.Title>
                    </Card.Body>
                </Card>
                {this.state.visible?
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
                                      <Form.Label>Comments</Form.Label>
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
                  <Button variant="secondary" onClick={
                        ()=>{
                            this.setState({ visible: false});
                            console.log("close")
                        }
                  }>Close</Button>
                </Modal.Footer>
              </Modal.Dialog>
                :
                null}
                {/* <AddComment 
                show={this.state.visible}
                onHide={addModalClose}
                /> */}
            </div>
        )
    }
}

{/* <Card style={{width: '18rem'}}>
            <Button variant="primary">
                <Card.Img variant="top" src="https://i.pinimg.com/564x/83/f0/3a/83f03ac706568420b12b98ed22016650.jpg" />
            </Button>
            <Card.Body>
                <Card.Title>Owner</Card.Title>
            </Card.Body>
            </Card> */}

export default Cards;
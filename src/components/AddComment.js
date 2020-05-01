import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Comment from './Comment';

class AddComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            newComment: ' ',
            comments: [
                {id: 1, cardId:"1", comment: "Hello", user: "Irene"},
                {id: 2, cardId:"1", comment: "Testing", user: "Gina"},
                {id: 3, cardId:"1", comment: "You're doing great", user: "Yuni"},
                {id: 4, cardId:"1", comment: "Good job", user: "Sherry"},
            ]
        }

        //this.writeComment = this.writeComment.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    state = {
        visible: false
    }

    // addComment(comment) {
    //     this.state.comments.push(comment);

    // }

    // writeComment(event) {
    //     // call method from parent to set comment
    //     console.log('submit');
    //     // sets it back to empty
    //     this.setState({
    //         newComment: ' '
    //     })
    // }

    handleInput(event) {
        console.log(this);
        this.setState({
            newComment: event.target.value,
        })
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
                          <Col>
                            {this.state.comments.map((comment) => {
                                return (
                                    <Comment user={comment.user} comment={comment.comment} key={comment.id}/>
                                )
                            })
                            }
                          </Col>
                      </Row>
                      <Row>
                          <Col sm={6}>

                              <Form onSubmit={this.handleSubmit}>
                                  <Form.Group controlId="Comments">
                                      <input
                                        type="text"
                                        className="Comments"                                    
                                        placeholder="add your comment"
                                        value={this.state.NewComment}
                                        onChange={this.handleInput}
                                      />
                                  </Form.Group>
                                  <Form.Group>
                                      <Button onClick={this.writeComment}>
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
import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Comment from './Comment';
import fire from '../fire.js';

const dbRef = fire.database().ref();

class AddComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            userUID: props.userUID,
            cardID: props.cardID,
            newComment: ' ',
            comments: [],
            visible: false
        }

        // this.writeComment = this.writeComment.bind(this);
        this.handleInput = this.handleInput.bind(this);
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
    getComments(){
        let commentDetails = []
        dbRef.child('User').on('value', snap => {
            const userInfo = snap.val();
            const comments = userInfo[this.props.userUID]['cards'][this.props.cardID]['comments']
            for (let comment in comments){
                commentDetails.push({
                    id: comment,
                    text: comments[comment]
                });
            }
            console.log(commentDetails)
        });
        return (commentDetails.map((comment)=> 
            <Comment 
                key={comment.id} 
                user={comment.id} 
                comment={comment.text} 
            />));
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
                            {/* {this.state.comments.map((comment) => {
                                return (
                                    <Comment user={comment.user} comment={comment.comment} key={comment.id}/>
                                )
                            })
                            } */}
                            {this.getComments()}
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

export default AddComment;
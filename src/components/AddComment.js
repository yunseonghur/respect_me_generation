import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Comment from './Comment';
import fire from '../fire';

const dbRef = fire.database();

class AddComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            userUID: props.userUID,
            cardID: props.cardID,
            username: "",
            comments: [],
            newComment: ''
        }

        this.writeComment = this.writeComment.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    state = {
        visible: false
    }

    getUserInfo(){
        dbRef.ref().child('User').on('value', snap => {
            const userInfo = snap.val();
            this.setState({
                cards: userInfo[this.state.userUID]['cards']
            });
            this.getCardDetails();
        });
    }

    getCardDetails(){
        let cards = this.state.cards;
        let cardDetails = [];
        for (let card in cards){
            cardDetails.push({
                id: card,
                comment: cards[card].comments,
                background: cards[card].imgOption,
                text: cards[card].text
            });
        }
        this.setState({
            cards: cardDetails,  // re-set cards as an array
            isLoading: false
        });
    }

    componentDidMount(){
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username: user.displayName,
                    userUID: user.uid
                });
                this.getUserInfo();
            } else {
                console.log("no current user");
            }
        })
    }

    writeComment(event) {
        
        console.log('write comment');
        console.log(this.state.newComment);
        console.log(this.state.userUID);
        console.log(this.state.cardID);
        
        // dbRef.ref("Card/" + this.state.cardID + '/comments').push({
        //     comment: this.state.newComment,
        //     user: this.state.userUID
        // });

        dbRef.ref("User/" + this.state.userUID).child('cards/' + this.state.cardID+ '/comments').push({
            comment: this.state.newComment,
            user: this.state.username
        });
    }

    // what is being typed into form
    handleInput(event) {
        console.log(this);
        this.setState({
            newComment: event.target.value,
        })
    }
    getComments(){
        let commentDetails = []
        dbRef.ref().child('User').on('value', snap => {
            const userInfo = snap.val();
            if(userInfo[this.props.userUID]!=null){
                const comments = userInfo[this.props.userUID]['cards'][this.props.cardID]['comments']
                console.log(comments)
                for (let comment in comments){
                    console.log(comments[comment].comment)
                    commentDetails.push({
                        id: comments[comment].user,
                        text: comments[comment].comment
                    });
                }
            }else{
                console.log("userUID is null!")
            }

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
                                        value={this.state.newComment}
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

// {id: 1, cardId:"1", comment: "Hello", user: "Irene"},
// {id: 2, cardId:"1", comment: "Testing", user: "Gina"},
// {id: 3, cardId:"1", comment: "You're doing great", user: "Yuni"},
// {id: 4, cardId:"1", comment: "Good job", user: "Sherry"},

export default AddComment;
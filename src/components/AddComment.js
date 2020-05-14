import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Comment from './Comment';
import fire from '../fire';
import MyCard from './MyCard';
import { faFlag, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReportModal from './ReportModal';
import './AddComment.css';
import TextLengthModal from './TextLengthModal';

const dbRef = fire.database();

class AddComment extends Component {

    constructor(props){
        super(props);
        this.state = {
            userUID: "",
            username: "",
            comments: [],
            newComment: '',
            visible: false,
            reportModal: false,
            textLengthModal: false
        }
        this.writeComment = this.writeComment.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    getUserInfo(){
        dbRef.ref().child('User').on('value', snap => {
            const userInfo = snap.val();
            this.setState({
                cards: userInfo[this.props.cardOwnerUID]['cards']
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
                text: cards[card].text,
                upvote: this.countUpvotes(cards[card].upvote),
                downvote: this.countDownvotes(cards[card].downvote)
            });
        }
        this.setState({
            cards: cardDetails,  // re-set cards as an array
            isLoading: false
        });
    }

    writeComment(event) {
        if (this.state.newComment.length <= 45) {
            // we need card owner UID
            dbRef.ref("User/" + this.props.cardOwnerUID).child('cards/' + this.props.cardID+ '/comments').push({
                comment: this.state.newComment,
                user: this.state.username
            });
            this.increasePoints(this.state.userUID);
        } else {
            this.setState({textLengthModal: true});
        }
        

    }

    increasePoints(currentUser){
        dbRef.ref('User/'+ currentUser).once('value')
            .then(function(snapshot){
                let points = snapshot.child('points').val()
                points += 5
                console.log(points)
                dbRef.ref('User/' + currentUser).update({
                    points
            })
        });
        this.checkBadge(currentUser);
    }

    checkBadge(currentUser){
        dbRef.ref('User/'+ currentUser).once('value')
            .then(function(snapshot){
                let points = snapshot.child('points').val()
                let badge = snapshot.child('badge').val()
                if(points >= 100){
                    dbRef.ref('User/' + currentUser).update({
                        badge: 'advanced'
                    });
                };
                console.log(badge);
        });
        
    }

    // what is being typed into form
    handleInput(event) {
        this.setState({
            newComment: event.target.value,
        })
    }

    getComments(){
        let commentDetails = []
        dbRef.ref().child('User').on('value', snap => {
            const userInfo = snap.val();
            if(userInfo[this.props.cardOwnerUID]!=null){
                const comments = userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['comments']
                for (let comment in comments){
                    commentDetails.push({
                        key: comment,
                        id: comments[comment].user,
                        text: comments[comment].comment,
                    });
                }
            }
        });

        return (commentDetails.map((comment)=> 
            <Comment 
                key={comment.key} 
                user={comment.id} 
                comment={comment.text} 
            />));
    }

    displayCard() {
        let imgOption;
        let text;
        let upvote;
        let downvote;
        dbRef.ref().child('User').on('value', snap => {
            const userInfo = snap.val();
            if(userInfo[this.props.cardOwnerUID]!=null){
                imgOption = userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['imgOption'];
                text = userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['text'];
                upvote = this.countUpvotes(userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['upvote']);
                downvote = this.countDownvotes(userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['downvote']);
            }
        });
        return <MyCard 
                    key={this.props.cardID}
                    id={this.props.cardID} 
                    background={imgOption} 
                    text={text}                                     
                    upvoteCount={upvote}
                    downvoteCount={downvote} />
    }

    iconClick = () => {
        this.setState({reportModal: true});
    }

    upvoteClicked = () => {
        let cardOwnerUID = this.props.cardOwnerUID
        let cardID = this.props.cardID
        let upvote
        dbRef.ref('User/' + cardOwnerUID).once('value')
            .then(function(snapshot){
                let card = snapshot.child('cards/' + cardID).val()
                if (card['upvote'] != null) {
                    upvote = card['upvote']
                    upvote += 1
                } else {
                    upvote = 1;
                }
                dbRef.ref('User/' + cardOwnerUID).child('cards/' + cardID).update({
                    upvote
                })
            console.log(upvote)
        });
    };

    downvoteClicked = () => {
        let cardOwnerUID = this.props.cardOwnerUID
        let cardID = this.props.cardID
        let downvote
        dbRef.ref('User/' + cardOwnerUID).once('value')
            .then(function(snapshot){
                let card = snapshot.child('cards/' + cardID).val()
                if (card['downvote'] != null) {
                    downvote = card['downvote']
                    downvote += 1
                } else {
                    downvote = 1;
                }
                dbRef.ref('User/' + cardOwnerUID).child('cards/' + cardID).update({
                    downvote
                })
            console.log(downvote)
        });
    };

    countUpvotes = (upvoteObj) => {
        if (upvoteObj != null) {
            return upvoteObj;
        }
        return "0";
    }

    countDownvotes = (downvoteObj) => {
        if (downvoteObj != null) {
            return downvoteObj;
        }
        return "0";
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

    render(){
        return(
            <div>
                <Modal show={this.props.show} animation={false} onHide={this.props.onHide} size='md' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                    <Modal.Title>
                        <span>Comments</span>
                        <FontAwesomeIcon id="reportIcon" onClick={this.iconClick} className="lightbulb" icon={faFlag} />
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Row>
                                <Col>
                                {this.displayCard()}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FontAwesomeIcon id="thumbsUpIcon" icon={faThumbsUp} onClick={this.upvoteClicked} />
                                    <FontAwesomeIcon id="thumbsDownIcon" icon={faThumbsDown} onClick={this.downvoteClicked} />
                                    <br />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                {this.getComments()}
                                </Col>
                            </Row>
                            <br />
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Comments">
                                            <input
                                            type="text"
                                            className="Comments"                                    
                                            placeholder="add your comment"
                                            value={this.state.newComment}
                                            onChange={this.handleInput}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            
                                            <Button onClick={this.writeComment}>
                                                Add Comment
                                            </Button>
                                            
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <ReportModal 
                    show={this.state.reportModal} 
                    onHide={()=> this.setState({reportModal: false})}
                    cardID={this.props.cardID}
                    cardOwnerUID={this.props.cardOwnerUID}/>
                <TextLengthModal
                    show={this.state.textLengthModal} 
                    onHide={()=> this.setState({textLengthModal: false})}
                    textLength={45}/>

            </div>
        )
    }
}

export default AddComment;
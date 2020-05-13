import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Container} from 'react-bootstrap';
import Comment from './Comment';
import fire from '../fire';
import MyCard from './MyCard';
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReportModal from './ReportModal';
import '../components/AddComment.css';

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
            reportModal: false
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
        // we need card owner UID
        dbRef.ref("User/" + this.props.cardOwnerUID).child('cards/' + this.props.cardID+ '/comments').push({
            comment: this.state.newComment,
            user: this.state.username
        });
        this.increasePoints(this.state.userUID);
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
                        text: comments[comment].comment
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
        var imgOption;
        var text;
        dbRef.ref().child('User').on('value', snap => {
            const userInfo = snap.val();
            if(userInfo[this.props.cardOwnerUID]!=null){
                imgOption = userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['imgOption'];
                text = userInfo[this.props.cardOwnerUID]['cards'][this.props.cardID]['text'];
            }
        });
        return <MyCard id={this.props.cardID} background={imgOption} text={text}/>
    }

    iconClick = () => {
        this.setState({reportModal: true});
    }

    render(){
        return(
            <div>
                <Modal show={this.props.show} animation={false} onHide={this.props.onHide} size='md' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                    <Modal.Title>
                        <div>Comments
                            <FontAwesomeIcon id="reportIcon" onClick={this.iconClick} className="lightbulb" icon={faLightbulb} />
                        </div>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='container'>
                            <Row>
                                <Col>
                                {this.displayCard()}
                                </Col>
                            </Row>
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
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <ReportModal 
                    show={this.state.reportModal} 
                    onHide={()=> this.setState({reportModal: false})}
                    cardID={this.props.cardID}
                    cardOwnerUID={this.props.cardOwnerUID}/>
            </div>
        )
    }
}

export default AddComment;
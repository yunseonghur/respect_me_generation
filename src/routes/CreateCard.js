import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import fire from '../fire';
import MyCard from '../components/MyCard';
import "../routes/CreateCard.css"


class CreateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOption: '',
            text: '',
            visible: false
        };
        this.db = fire.database();
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleTxtChange = this.handleTxtChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleImgChange(event) {
        this.setState({
            imgOption: event.target.value
        })
        
    }

    handleTxtChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var currentUser = fire.auth().currentUser;
        if (currentUser != null) {
            console.log("You selected", this.state.imgOption);
            console.log("Your text:", this.state.text);
            var key = this.db.ref().child('Card').push().key;
            this.db.ref("Card/" + key).set({
                imgOption: this.state.imgOption,
                text: this.state.text
            });
            console.log("InCreateCard", currentUser.uid);
            this.db.ref("User/" + currentUser.uid).child("cards/" + key).set({
                imgOption: this.state.imgOption,
                text: this.state.text
            });
        }
        this.setState({visible:true});
        console.log("in handle submit", this.state.imgOption);
    }

    render() {
        const {text} = this.state
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <div id='selectImg'>
                    <p className="instruction">1. Select Image</p>
                    <div className='jumbotron'>
                        <CardDeck>
                            <div className='container'>
                                <label>
                                    <div className="imgOption">
                                        <Card>
                                            <Card.Img className="cardImage" src={require("../images/img1.jpg")}/>
                                        </Card>
                                        <input type="radio" value="img1" checked={this.state.imgOption === "img1"} onChange={this.handleImgChange} />
                                    </div>
                                </label>
                                <label>
                                    <div className="imgOption">
                                        <Card>
                                            <Card.Img className="cardImage" src={require("../images/img2.jpg")}/>
                                        </Card>
                                        <input type="radio" value="img2" checked={this.state.imgOption === "img2"} onChange={this.handleImgChange} />
                                    </div>
                                </label>
                                <label>
                                    <div className="imgOption">
                                        <Card>
                                            <Card.Img className="cardImage" src={require("../images/img3.jpg")}/>
                                        </Card>
                                        <input type="radio" value="img3" checked={this.state.imgOption === "img3"} onChange={this.handleImgChange} />
                                    </div>
                                </label>
                            </div>
                        </CardDeck>
                    </div>
                </div>
                <div id="enterText">
                    <p className="instruction">2. Enter Text</p>
                    <div id="textField" className='jumbotron'>
                        <textarea name='text' onChange={this.handleTxtChange} />
                    </div>
                </div>
                <div className='container'>
                    <Button onClick={this.handleSubmit} size="lg">Create!</Button>
                </div>
            </form>
             { this.state.visible ? 
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MyCard id="1" background={this.state.imgOption} text={this.state.text} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={
                            ()=> {
                                this.setState({ visible: false });
                            }
                        }>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
                :
                null
            }
            </div>
            
        )
    }
}

export default CreateCard;

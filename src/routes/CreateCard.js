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
            imgOption: 1,
            text: '',
            visible: false,
            imgSrc: ''
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
            var key = this.db.ref().child('Card').push().key;
            this.db.ref("Card/" + key).set({
                imgOption: this.state.imgOption,
                text: this.state.text
            });
            this.db.ref("User/" + currentUser.uid).child("cards/" + key).set({
                imgOption: this.state.imgOption,
                text: this.state.text
            });
        }
        var imgRef = this.db.ref("Image");
        imgRef.on('value', snap => {
            const imgInfo = snap.val();
            this.setState({ imgSrc: imgInfo[this.state.imgOption]});
        })
        this.setState({visible:true});
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
                                            <Card.Img className="cardImage" src={"https://i.pinimg.com/564x/aa/b8/49/aab84958979e408935c1b472deacda43.jpg"}/>
                                        </Card>
                                        <input type="radio" value="1" checked={this.state.imgOption === "1"} onChange={this.handleImgChange} />
                                    </div>
                                </label>
                                <label>
                                    <div className="imgOption">
                                        <Card>
                                            <Card.Img className="cardImage" src={"https://i.pinimg.com/564x/73/96/bd/7396bd1cbf9e8ef8c73be0476290fd95.jpg"}/>
                                        </Card>
                                        <input type="radio" value="2" checked={this.state.imgOption === "2"} onChange={this.handleImgChange} />
                                    </div>
                                </label>
                                <label>
                                    <div className="imgOption">
                                        <Card>
                                            <Card.Img className="cardImage" src={"https://i.pinimg.com/564x/73/6b/2c/736b2c0555170cc90589f8fef5f8f6e8.jpg"}/>
                                        </Card>
                                        <input type="radio" value="3" checked={this.state.imgOption === "3"} onChange={this.handleImgChange} />
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
                        <MyCard id="1" background={this.state.imgSrc} text={this.state.text} />
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

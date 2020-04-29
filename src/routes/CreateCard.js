import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import fire from '../fire';
// import "./Home.css";


class CreateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOption: '',
            text: ''
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
                key
            });
        }
    }

    render() {
        const {text} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div id='selectImg'>
                    <p>1. Select Image</p>
                    <div className='jumbotron'>
                        <CardDeck>
                            <label>
                                <div className="imgOption">
                                    <Card>
                                        <Card.Img src="https://via.placeholder.com/120px100" />
                                    </Card>
                                    <input type="radio" value="img1" checked={this.state.imgOption === "img1"} onChange={this.handleImgChange} />
                                </div>
                            </label>
                            <label>
                                <div className="imgOption">
                                    <Card>
                                        <Card.Img src="https://via.placeholder.com/120px100" />
                                    </Card>
                                    <input type="radio" value="img2" checked={this.state.imgOption === "img2"} onChange={this.handleImgChange} />
                                </div>
                            </label>
                            <label>
                                <div className="imgOption">
                                    <Card>
                                        <Card.Img src="https://via.placeholder.com/120px100" />
                                    </Card>
                                    <input type="radio" value="img3" checked={this.state.imgOption === "img3"} onChange={this.handleImgChange} />
                                </div>
                            </label>
                        </CardDeck>
                        
                    </div>
                </div>
                <div id="enterText">
                    <p>2. Enter Text</p>
                    <div id="textField">
                        <textarea name='text' onChange={this.handleTxtChange} />
                    </div>
                </div>
                <Button onClick={this.handleSubmit}>Create!</Button>

            </form>
        )
    }
}

export default CreateCard;

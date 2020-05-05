
import React, {Component} from 'react';
import MyCard from '../components/MyCard';
import {CardDeck, Button, Jumbotron, Container} from 'react-bootstrap';
import AddComment from '../components/AddComment';
import { Link } from 'react-router-dom';
import fire from '../fire'
// import "./Cards.css";

const dbRef = fire.database().ref();

class Cards extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userUID: "",
            cardSelected: "",
            isLoading: true,
            showCards: true, 
            visible: false,
            cards: [],
            cardSelected: ""
        }
    }

    getUserInfo(){
        dbRef.child('User').on('value', snap => {
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

    cardClicked = () => {
        this.setState({visible: true})
      };
    
    hideModal = () => {
        this.setState({visible: false})
    }

    render() {
        return (
            <div>
                <h2 className="logo-text"><b>Respect Me<br/>Generation</b></h2>

                <Jumbotron>
                    <h1>How are you feeling today?</h1>
                    <Link to='createCard' className="btn btn-primary">Add Card</Link>
                </Jumbotron>

                {this.state.isLoading ? (
                    <div className="loader">
                    <span className="loader__text">Loading...</span>
                    </div>
                ) : this.state.showCards ?
                    (
                
                    <Container>
                        <CardDeck>
                        {Array.from(this.state.cards).map((card)=> 
                            <MyCard 
                                key={card.id} 
                                id={card.id} 
                                background={card.background} 
                                text={card.text} 
                                onClick={()=>{
                                    this.setState({ visible: true, cardSelected: card.id });
                                }}
                            />)}

                            {this.state.visible ?
                                <AddComment hideModal={this.hideModal} userUID={this.state.userUID} cardID={this.state.cardSelected}/>
                            : null}
                        
                        </CardDeck>
                    </Container>
                    ) : (
                        <div className="loader">
                        <span className="loader__text">Not Visible</span>
                        </div>
                    )}
            </div>
        )
    }
}

export default Cards;
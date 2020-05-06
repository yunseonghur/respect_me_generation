
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
            cardSelected: "",
            isLoading: true,
            showCards: true, 
            visible: false,
            cards: [],
            cardSelected: ""
        }
    }

    getCards(users){
        let cardCollected = [];
        for (let user in users){
            let cards = users[user].cards
            for (let card in cards){
                cardCollected.push({
                    id: card,
                    background: cards[card].imgOption,
                    text: cards[card].text,
                    comments: cards[card].comments
                });
            }
        }
        this.setState({ 
            cards: cardCollected,
            isLoading: false
        })
        console.log(this.state.cards)
    }

    componentDidMount(){
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            this.getCards(users);
        });
    }

    cardClicked = () => {
        this.setState({visible: true})
      };
    
    hideModal = () => {
        this.setState({visible: false})
    }

    getCardOwner = () => {
        let userUID
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            for (let user in users){
                let cards = users[user].cards
                for (let card in cards){
                    if(card == this.state.cardSelected){
                        userUID = user
                    }
                }
            }
        });
        return userUID
      };

    render() {
        return (
            <div>
                <h2 className="logo-text"><b>Respect Me<br/>Generation</b></h2>

                <Jumbotron>
                    <h1>What do you want to share today?</h1>
                    <Button>Add Card</Button>
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
                                <AddComment hideModal={this.hideModal} userUID={this.getCardOwner()} cardID={this.state.cardSelected}/>
                                // not passing other user's UID 
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
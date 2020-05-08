import React from 'react';
import MyCard from './MyCard';
import {CardDeck, Container} from 'react-bootstrap';
import AddComment from './AddComment';
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
            cardSelected: "",
            tag: ""
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

    static getDerivedStateFromProps(props, state) {
        return {tag: props.tag}
    }

    getCardOwner = () => {
        let cardOwnerUID;
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            for (let user in users){
                let cards = users[user].cards
                for (let card in cards){
                    if(card == this.state.cardSelected){
                        cardOwnerUID = user
                    }
                }
            }
        });
        return cardOwnerUID
      };
    
    sortCards() {
        var users;
        dbRef.child('User').on('value', snap => {
            users = snap.val();
        });
        let cardCollected = [];
        for (let user in users){
            let cards = users[user].cards
            if (this.state.tag != "all") {
                for (let card in cards){
                    if (cards[card].tag === this.state.tag) {
                        cardCollected.push({
                            id: card,
                            background: cards[card].imgOption,
                            text: cards[card].text,
                            comments: cards[card].comments
                        });
                    } 
                }
            } else if (this.props.tag === "all") {
                for (let card in cards){
                    cardCollected.push({
                        id: card,
                        background: cards[card].imgOption,
                        text: cards[card].text,
                        comments: cards[card].comments
                    });
                }
            }

        }
        return cardCollected;
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <div className="loader">
                    <span className="loader__text">Loading...</span>
                    </div>
                ) : this.state.showCards ?
                    (
                    <Container>
                        <CardDeck>
                        {Array.from(this.sortCards()).map((card)=> 
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
                                <AddComment hideModal={this.hideModal} cardOwnerUID={this.getCardOwner()} cardID={this.state.cardSelected}/>
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
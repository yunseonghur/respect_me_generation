import React from 'react';
import "./Home.css";
import fire from '../fire.js';
import MyCard from '../components/MyCard';
import CardDeck from 'react-bootstrap/CardDeck';
import { Link } from 'react-router-dom';
import Quote from '../components/Quote';
import HomeResourceEntry from '../components/HomeResourceEntry';


const dbRef = fire.database().ref();

class Home extends React.Component{
    state = { 
        message: "",
        cards: [], 
        resources: []
    };

    // Get current year, month, date to get a daily message from database
    getDailyMessage(){
        var year = new Date().getFullYear();
        var month = new Date().getMonth(); // Jan:0 ~ Dec:11
        var date = new Date().getDate();
        dbRef.child('Messages').orderByKey().on('value', snap => {
            const messages = snap.val();
            this.setState({
                message: messages[year][month][date]
            });
            console.log(this.state.message) // Testing: print proper daily message
        });
    }
    // Get all cards from the users
    async getCards(users){
        let cardsCollected = [];
        for (let user in users){
            let cards = users[user].cards
            for (let card in cards){
                // Store comments as well if exist
                if (cards[card]['comments']!=null){
                    cardsCollected.push({
                        id: card,
                        background: cards[card].imgOption,
                        text: cards[card].text,
                        comments: cards[card].comments
                    });
                } else {
                    cardsCollected.push({
                        id: card,
                        background: cards[card].imgOption,
                        text: cards[card].text
                    });
                }
            }
        }
        // If the number of total cards is less than 3, display them all
        if(cardsCollected.length <= 3){
            this.setState({ cards: cardsCollected });
            console.log(cardsCollected) // Testing: print all cards stored in the database
            // Else pick top 3 cards
        } else {
        await this.pickTopThreeCards(cardsCollected);
        }
    }
    // Count the number of comments for each card and pick top 3
    pickTopThreeCards(cardsCollected){
        let cardsPicked = [];
        let candidates = [];
        for(let card in cardsCollected){
            if(cardsCollected[card]['comments']!=null){
                candidates.push(cardsCollected[card])
                candidates.push(Object.keys(cardsCollected[card]['comments']).length)
            }
        }
        let first = -1
        let second = -1
        let third = -1
        let firstCard, secondCard, thirdCard
        for(var i=1; i<candidates.length; i+=2){
            /* If current element is greater than first*/
            if (candidates[i] > first){ 
                third = second; 
                second = first; 
                first = candidates[i]; 
                // Keep track of their index
                thirdCard = secondCard;
                secondCard = firstCard;
                firstCard = i;
            /* If candidatesNumOfComments[i] is in between first and second then update second  */
            } else if (candidates[i] > second){ 
                third = second; 
                second = candidates[i]; 
                thirdCard = secondCard;
                secondCard = i;
            } else if (candidates[i] > third) 
                third = candidates[i]; 
                thirdCard = i;
        }
        // store the most popular card
        cardsPicked.push({
            id: candidates[firstCard-1]['id'],
            background: candidates[firstCard-1]['background'],
            text: candidates[firstCard-1]['text'],
        });
        // store the second most popular card
        cardsPicked.push({
            id: candidates[secondCard-1]['id'],
            background: candidates[secondCard-1]['background'],
            text: candidates[secondCard-1]['text'],
        });
        // store the third most popular card
        cardsPicked.push({
            id: candidates[thirdCard-1]['id'],
            background: candidates[thirdCard-1]['background'],
            text: candidates[thirdCard-1]['text'],
        });
        this.setState({ cards: cardsPicked });
    }

    componentDidMount(){
        // this.getDailyMessage();
        // Get all users to collect their cards
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            this.getCards(users);
        });
    }

    render(){
        return (
            <div className="wrapper">
                <Quote />

                <div className="card-section">
                    <h2>COMMUNITY BOARD</h2>
                    <p>What is your community talking about today?</p>
                    <CardDeck>
                        {Array.from(this.state.cards).map((myCard)=> 
                            <MyCard 
                                key={myCard.id} 
                                id={myCard.id} 
                                background={myCard.background} 
                                text={myCard.text} 
                            />)}
                        <Link to='/communityBoard' className="btn btn-link">></Link>
                    </CardDeck>
                </div>

                <div className="resource-section">
                    <HomeResourceEntry tagName="health"></HomeResourceEntry>
                    <HomeResourceEntry tagName="relationships"></HomeResourceEntry>
                    <HomeResourceEntry tagName="studying"></HomeResourceEntry>
                </div>
            </div>
        );
    }
}

export default Home;
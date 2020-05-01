import React from 'react';
import "./Home.css";
import fire from '../fire.js';
import MyCard from '../components/MyCard';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron'

const dbRef = fire.database().ref();

class Home extends React.Component{
    state = { 
        message: "",
        cards: [],
        resources: [],
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
    getCards(users){
        let cardCollected = [];
        for (let user in users){
            let cards = users[user].cards
            for (let card in cards){
                cardCollected.push({
                    id: card,
                    background: cards[card].imgOption,
                    text: cards[card].text
                });
            }
        }
        console.log(cardCollected) // Testing: print all cards stored in the database
        this.pickTopThreeCards(cardCollected);
        
    }
    pickTopThreeCards(cardCollected){
        console.log(cardCollected)
    }
    componentDidMount(){
        this.getDailyMessage();
        // Get all users to collect their cards
        dbRef.child('User').on('value', snap => {
            const users = snap.val();
            this.getCards(users);
        });
    }

    render(){
        return (
            <div>
                <Carousel interval="8000">
                    <Carousel.Item>
                        <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the first slide" />
                        <Carousel.Caption className="caption">
                            <p>Today's message</p>
                            <h3>"{this.state.message}"</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the second slide" />
                        <Carousel.Caption className="caption">
                            <h3>Introducing Respect Me Generation</h3>
                            <p>A community for teenagers.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="card-section">
                    <h3>Cards</h3>
                    <CardDeck>
                        {Array.from(this.state.cards).map((myCard)=> 
                            <MyCard 
                                key={myCard.id} 
                                id={myCard.id} 
                                background={myCard.background} 
                                text={myCard.text} 
                            />)}
                    </CardDeck>
                </div>

                <div className="resource-section">
                    <h3>Resources</h3>
                    <Jumbotron fluid>
                        <p></p>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

export default Home;
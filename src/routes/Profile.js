import React from 'react';
import "./Profile.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyCard from '../components/MyCard';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import fire from '../fire.js';

const dbRef = fire.database().ref();

class Profile extends React.Component{
    state = {
        userUID: "",
        username: "",
        badge: "",
        points: "",
        cards: [],
        videos: [],
        isLoading: true,
        visible: true  // true if cards are visible & false if videos are visible
    };
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
            } else {
                console.log("no current user");
            }
        })
        dbRef.child('User').on('value', snap => {
            const userInfo = snap.val();
            this.setState({
                badge: userInfo[this.state.userUID]['badge'],
                points: userInfo[this.state.userUID]['points'],
                cards: userInfo[this.state.userUID]['cards']
            });
            this.getCardDetails();
        });
    }
    render(){
        const label = this.state.visible? "Your Cards" : "Your Videos";
        return (
            <div>
                <Jumbotron>
                    <p>Hi {this.state.username}!</p>
                    <span>badge: {this.state.badge}, </span>
                    <span>points: {this.state.points}</span>
                </Jumbotron>

                <ButtonGroup> 
                    <Button variant="light" onClick={()=>{
                        this.setState({ visible: true});
                    }}>
                        Your Cards
                    </Button>
                    <Button variant="light" onClick={()=>{
                        this.setState({ visible: false});
                    }}>
                        Your Videos
                    </Button>
                </ButtonGroup>

                {this.state.isLoading ? (
                    <div className="loader">
                    <span className="loader__text">Loading...</span>
                    </div>
                ) : this.state.visible ?
                    (
                    <div className="cards">
                        <h3>{label}</h3>
                        <CardDeck>
                            {this.state.cards.map((myCard)=> 
                            <MyCard 
                                key={myCard.id} 
                                id={myCard.id} 
                                background={myCard.background} 
                                text={myCard.text} 
                            />)}
                        </CardDeck>
                    </div>
                    ) : (
                    <div className="videos">
                        <h3>{label}</h3>
                        <p>displaying videos</p>
                    </div>)
                }
            </div>
        );
    }
}


export default Profile;

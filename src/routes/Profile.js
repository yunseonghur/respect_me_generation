import React from 'react';
import "./Profile.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyCard from '../components/MyCard';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import fire from '../fire.js';
import { CardHeader } from 'react-bootstrap/Card';


class Profile extends React.Component{
    state = {
        userUID: "",
        username: "",
        badge: "",
        points: "",
        cards: [],
        videos: [],
        visible: true  // true if cards are visible & false if videos are visible
    };
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
        this.database = fire.database().ref().child('User').orderByKey();
        this.database.on('value', snap => {
            const userInfo = snap.val();
            this.setState({
                badge: userInfo[this.state.userUID]['badge'],
                points: userInfo[this.state.userUID]['points']
            });
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
                <h3>{label}</h3>
                {this.state.visible ?
                    <CardDeck>
                        <MyCard id="1" background="https://via.placeholder.com/120px100" text="You yourself, as much as anybody in the entire universe, deserve your love and affection" />
                        <MyCard id="2" background="https://via.placeholder.com/120px100" text="I have public speaking tmrw, any suggestions on how to make myself feel less anxious?" />
                        <MyCard id="3" background="https://via.placeholder.com/120px100" text="" />
                    </CardDeck>
                    : <div>displaying videos</div>}
            </div>
        );
    }
}


export default Profile;
import React from 'react';
import "./Profile.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyCard from '../components/MyCard';
import AddComment from '../components/AddComment';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import fire from '../fire.js';
import { CloudinaryContext, Video } from 'cloudinary-react';

const dbRef = fire.database().ref();
const UserVideo = (props) => { // a single video component in UserVideo.js
    return (
        <div>
            <CloudinaryContext cloudName="respectmegen">
                {
                    <div>
                        <Video publicId={props.videoId} width="350" controls></Video>
                    </div>
                }
            </CloudinaryContext>
        </div>
    );
}

class Profile extends React.Component{
    state = {
        userUID: "",
        username: "",
        badge: "",
        points: "",
        cards: [],
        videos: [],
        isLoading: true,
        visible: true,  // true if cards are visible & false if videos are visible
        show: false,
        cardSelected: ""
    };
    showModal = () => {
        this.setState({show: true})
      };
    hideModal = () => {
        this.setState({show: false})
    }
    getUserInfo(){
        dbRef.child('User').on('value', snap => {
            const userInfo = snap.val();
            this.setState({
                badge: userInfo[this.state.userUID]['badge'],
                points: userInfo[this.state.userUID]['points'],
                cards: userInfo[this.state.userUID]['cards'],
                videos: userInfo[this.state.userUID]['videos']
            });
            this.getCardDetails();
            this.getVideos();
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
    getVideos(){
        let videos = this.state.videos;
        let videoArr = [];
        for (let video in videos){
            videoArr.push({
                id: videos[video]
            });
        }
        this.setState({ videos: videoArr });
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
    render(){
        const tabLabel = this.state.visible? "Your Cards" : "Your Videos";
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

                <h3>{tabLabel}</h3>
                {this.state.isLoading ? (
                    <div className="loader">
                    <span className="loader__text">Loading...</span>
                    </div>
                ) : this.state.visible ?
                    (
                    <div className="cards">
                        <CardDeck>
                            {Array.from(this.state.cards).map((myCard)=> 
                            <MyCard 
                                key={myCard.id} 
                                id={myCard.id} 
                                background={myCard.background} 
                                text={myCard.text} 
                                onClick={()=>{
                                    this.setState({ show: true, cardSelected: myCard.id });
                                }}
                            />)}
                            {this.state.show ?
                            <AddComment hideModal={this.hideModal} userUID={this.state.userUID} cardID={this.state.cardSelected}/>
                            : null}
                        </CardDeck>
                    </div>
                    ) : (
                    <div className="videos">
                            {Array.from(this.state.videos).map((myVideo)=> 
                            <UserVideo 
                                key={myVideo.id} 
                                videoId={myVideo.id}
                            />)}
                    </div>)
                }
            </div>
        );
    }
}


export default Profile;
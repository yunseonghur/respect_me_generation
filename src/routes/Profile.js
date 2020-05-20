import React, { Component } from 'react';
import "./Profile.css";
import MyCard from '../components/MyCard';
import AddComment from '../components/AddComment';
import UserVideo from '../components/UserVideo';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import fire from '../fire.js';
import basicBadge from '../images/badge_flat.jpg';
import advBadge from '../images/adv_badge.png';
import profile from '../images/profile.png';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";


const dbRef = fire.database().ref();

/**
 * The user profile page where they can view (and in the future edit/delete)
 * their own posts, along with checking their current points and badge.
 */
class Profile extends Component{
    state = {
        userUID: "",
        username: "",
        badge: "",
        points: "",
        cards: [],
        videos: [],
        isLoading: true, // true if the server is still loading cards data
        show: false, // false if modal is hidden
        cardSelected: "",
        videoVisible: false,
        cardVisible: true   // starts out showing cards
    };

    // Get current user's name and uid if exist
    componentDidMount(){
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username: user.displayName,
                    userUID: user.uid
                });
                this.getUserInfo();
            }
        })
    }

    // Get current user's info: badge, points, cards, and videos
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

    // Set a flag for modal to true to appear
    showModal = () => {
        this.setState({show: true})
    }
    // Set a flag for modal to false to be hidden
    hideModal = () => {
        this.setState({show: false})
    }

    /**
     * Counts the number of comments user has received.
     * @param {Comment} cardCommentObj a card's comment stored in the user
     */
    countComments = (cardCommentObj) => {
        // count comments under each card
        let cardComment = cardCommentObj;
        let commentNumber = 0;
        if (cardComment != null) {
            // count and increment commentNumber
            for (let count in cardComment) {
                commentNumber++;
            }
        }

        return commentNumber;
    }

    /**
     * Loads in the details needed to make populate each Card component.
     */
    getCardDetails() {
        let cards = this.state.cards;
        let cardDetails = [];
        for (let card in cards){

            let commentNumber = this.countComments(cards[card].comments)

            cardDetails.push({
                id: card,
                background: cards[card].imgOption,
                text: cards[card].text,
                numComments: commentNumber,
                upvote: this.countUpvotes(cards[card].upvote),
                downvote: this.countDownvotes(cards[card].downvote)
            });
        }
        this.setState({
            cards: cardDetails,  // re-set cards state as an array
            isLoading: false
        });
    }

    countUpvotes = (upvoteObj) => {
        if (upvoteObj != null) {
            return upvoteObj;
        }
        return "0";
    }

    countDownvotes = (downvoteObj) => {
        if (downvoteObj != null) {
            return downvoteObj;
        }
        return "0";
    }

    // Store the current user's videos in an array instead of in json format
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

    /**
     * toggles between the video and card categories
     */
    toggleOpenCards = () => {
        if (this.state.cardVisible === false) {
            this.setState({cardVisible: true, videoVisible: false})
        } else {
            console.log("cards already opened.")
        }
    }
    
    toggleOpenVideos = () => {
        if (this.state.videoVisible === false) {
            this.setState({videoVisible: true, cardVisible: false})
        } else {
            console.log("videos already opened.")
        }
    }


    render() {

        // const tabLabel = this.state.cardVisible? "Cards" : "Videos";

        // determines which badge icon to use
        let badgeIcon;
        if(this.state.badge === 'basic'){
            badgeIcon = <img className='img' src={basicBadge} alt='Basic Badge'></img>
        } else {
            badgeIcon = <img className='img' src={advBadge} alt='Advanced Badge'></img>
        };
        
        return (
            
            <div>
                {/* header section with the profile picture and points. */}
                <div className="header">
                    <Container>
                        <div className='pill'>
                        <h3>
                            <span>{this.state.username}</span>
                            <img className='profile' src={profile} alt='Profile Pic'></img>
                            <a data-for='proftt' data-tip={this.state.badge}>{badgeIcon}</a>
                            <a id="points-text" data-for='proftt' data-tip='Your Points'><FontAwesomeIcon id="coin-icon" icon={faCoins}/> x{this.state.points}</a>
                            <ReactTooltip id="proftt" place='bottom' type='warning' effect='float' />
                        </h3>
                        </div>
                    </Container>
                </div>

                {/* section holding user's cards or videos */}
                <div className="container">
                    <ButtonGroup> 
                            <Button variant="light" onClick={this.toggleOpenCards}>Cards</Button>
                            <Button variant="light" onClick={this.toggleOpenVideos}>Videos</Button>
                    </ButtonGroup>
                    {this.state.isLoading ? (
                        <div className="loader">
                        <span className="loader__text">Loading...</span>
                        </div>
                    ) : this.state.cardVisible ? (
                        <div className="cards">
                            <Container>
                                <CardDeck className="row row-cols-sm-2 row-cols-md-3">
                                    {
                                    Array.from(this.state.cards).map((myCard)=> 
                                        <MyCard 
                                            key={myCard.id} 
                                            id={myCard.id} 
                                            background={myCard.background} 
                                            text={myCard.text} 
                                            commentCount={myCard.numComments}
                                            upvoteCount={myCard.upvote}
                                            downvoteCount={myCard.downvote}
                                            onClick={()=>{this.setState({ show: true, cardSelected: myCard.id })}}/>)
                                    }

                                    {this.state.show ?
                                        <AddComment 
                                            show={this.state.show} 
                                            cardOwnerUID={this.state.userUID} 
                                            cardID={this.state.cardSelected} 
                                            onHide={() => this.setState({show: false})}/> : null}
                                </CardDeck>
                            </Container>
                        </div>
                        ) : (<div className="videos">
                                {Array.from(this.state.videos).map((myVideo)=> 
                                    <UserVideo key={myVideo.id} videoId={myVideo.id}/>)}
                            </div>
                            )
                    }
                </div>
            </div>  // closing root node
        );
    }   // closing render function
}

export default Profile;
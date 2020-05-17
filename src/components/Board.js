import React, {Component} from 'react';
import './Board.css';
import Cards from './Cards';
import VideoDisplay from "./VideoDisplay";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import fire from '../fire.js';

/**
 * Component that handles toggling display of cards and videos.
 * Actual data is being displayed by Card and VideoDisplay components.
 * Called in CommunityBoard.js
 */
class Board extends Component{

    constructor(props) {
        super(props)
        this.state = {
            userUID: null,
            isLoading: true, // true if the server is still loading cards data
            show: false, // false if modal is hidden
            tag: "all", // selected tag to sort
            videoVisible: false,
            cardVisible: true   // starts out showing cards
        }
        this.toggleOpenCards = this.toggleOpenCards.bind(this);
        this.toggleOpenVideos = this.toggleOpenVideos.bind(this);
    }

    componentDidMount() {
        // get references that DON'T change
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userUID: user.uid,
                })
            }
        })
    }

    /**
     * Event handler for tag selection
     */
    handleTag = (event) => {
        event.preventDefault();
        this.setState({
            tag: event.target.name
        })
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
    
    /**
     * toggles between the video and card categories
     */
    toggleOpenVideos = () => {
        if (this.state.videoVisible === false) {
            this.setState({videoVisible: true, cardVisible: false})
        } else {
            console.log("videos already opened.")
        }
    }

    render() {
        return (
            <div className="text-center">
                <div className="toggleButtons">
                <h2>COMMUNITY BOARD</h2>
                <h5>What is your community talking about today?</h5>
                {
                    this.state.cardVisible ? 
                    <div className="tagGroup">
                        <ButtonGroup>
                            <Button name="all" onClick={this.handleTag} variant="outline-primary" className="rounded-pill">ALL</Button>
                            <Button name="study" onClick={this.handleTag} variant="outline-primary" className="rounded-pill">study</Button>
                            <Button name="relationship" onClick={this.handleTag} variant="outline-primary" className="rounded-pill">relationship</Button>
                            <Button name="health" onClick={this.handleTag} variant="outline-primary" className="rounded-pill">health</Button>
                        </ButtonGroup>
                    </div>
                    : <div><br/><br/><br/></div>
                }
                    <ButtonGroup> 
                        <Button variant="light" onClick={this.toggleOpenCards}>Cards</Button>
                        <Button variant="light" onClick={this.toggleOpenVideos}>Videos</Button>
                    </ButtonGroup>
                </div>
                <div>
                    { this.state.cardVisible ? <Cards tag={this.state.tag} />: <VideoDisplay />}
                </div>

            </div>
        )}
}

export default Board;

 // state ={
    //     userUID: null,
    //     isLoading: true, // true if the server is still loading cards data
    //     visible: true,  // true if cards are visible & false if videos are visible
    //     show: false, // false if modal is hidden
    //     tag: "all", // selected tag to sort
    //     displayMode: "card"
    // }

// display = () => {
    //     if (this.state.tag === "study") {
    //         if (this.state.cardVisible) {
    //             return <Cards tag={this.state.tag}/>
    //         }
    //         // return <Cards tag={this.state.tag} />
    //     } else if (this.state.tag === "relationship") {
    //         if (this.state.cardVisible) {
    //             return <Cards tag={this.state.tag}/>
    //         }
    //         // return <Cards tag={this.state.tag} />
    //     }
    // }

    // visible: true,  // true if cards are visible & false if videos are visible
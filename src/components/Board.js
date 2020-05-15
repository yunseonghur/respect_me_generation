import React from 'react';
import './Board.css';
import Cards from './Cards';
import VideoDisplay from "./VideoDisplay";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import fire from '../fire.js';


/**
 * Component that handles toggling display of cards and videos.
 * Actual data is being displayed by Card and VideoDisplay components.
 */
class Board extends React.Component{

    state ={
        userUID: null,
        isLoading: true, // true if the server is still loading cards data
        visible: true,  // true if cards are visible & false if videos are visible
        show: false, // false if modal is hidden
        tag: "all", // selected tag to sort
        displayMode: "card"
    }

    componentDidMount() {
        // get references that DON'T change
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userUID: user.uid,
                })
                console.log("Logged in. UID: " + this.state.userUID);
            } else {
                console.log("you're not logged in.")
            }
        })
    }

    handleTag = (event) => {
        event.preventDefault();
        this.setState({
            tag: event.target.name
        })
    }

    display = () => {
        if (this.state.tag === "study") {
            if (this.state.visible) {
                return <Cards tag={this.state.tag}/>
            }
            // return <Cards tag={this.state.tag} />
        } else if (this.state.tag === "relationship") {
            if (this.state.visible) {
                return <Cards tag={this.state.tag}/>
            }
            // return <Cards tag={this.state.tag} />
        }
    }

    // TODO: Replace hardcoded tags (line14~)
    render() {
        return (
            <div className="text-center">
                <h2>COMMUNITY BOARD</h2>
                <h5>What is your community talking about today?</h5>
                {
                    this.state.visible ? 
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
                    <Button variant="light" onClick={()=>{
                        this.setState({ visible: true});
                    }}>
                        Cards
                    </Button>
                    <Button variant="light" onClick={()=>{
                        this.setState({ visible: false});
                    }}>
                        Videos
                    </Button>
                </ButtonGroup>
                { this.state.visible ? <Cards tag={this.state.tag} />: <VideoDisplay />}
            </div>
        )}
}

export default Board;
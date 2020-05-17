import React, {Component} from 'react';
import '../components/MiniBoard.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Cards from './Cards';
import VideoDisplay from "./VideoDisplay";
import { withRouter } from 'react-router-dom';

/**
 * A minified version of the community board
 * which doesn't show all videos.
 * Called in Home.js
 */
class MiniBoard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            videoVisible: false,
            cardVisible: true,   // starts out showing cards
            isCollapsed: true, 
            btnText: "See more", 
            tag: "all", 
            displayMode: "card"};
        this.toggleExpandHandler = this.toggleExpandHandler.bind(this);
        this.divStyle = {
          maxHeight: "400px"
        }  
      }

    /**
     * Redirects user to CommunityBoard.js
     */
    toCommBoard = () => {
        this.props.history.push({
            pathname: "/communityBoard"
        });
    }

    /**
     * clicking once expands, another takes user to commBoard
    */ 
    toggleExpandHandler = () => {
        if (this.state.isCollapsed === true) {
            this.setState({isCollapsed: false, btnText: "View Full Board" })
            this.divStyle = {
                maxHeight: "700px"
            }
        } else {
            // redirect to full community board
            this.toCommBoard();
        }
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
            <div>
                <div className="toggleButtons">
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
                
                <div className="visibleBoardWrapper">
                    <div style={this.divStyle} className="visibleBoard">
                        { this.state.cardVisible ? <Cards tag={this.state.tag} /> : <VideoDisplay /> }
                    </div>
                    <div className="fade" style={{opacity: "1"}}></div>
                    <div className="buttonContainer">
                        <button onClick={this.toggleExpandHandler} className="show">{this.state.btnText}</button>
                    </div>
                </div>
            </div>
        )}

}

export default withRouter(MiniBoard);
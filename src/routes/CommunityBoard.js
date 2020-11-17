import React, { Component } from "react";
import "./CommunityBoard.css";
import Cards from "../components/Cards";
import VideoDisplay from "../components/VideoDisplay";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import fire from "../fire.js";

/**
 * Component that handles toggling display of cards and videos.
 * Actual data is being displayed by Card and VideoDisplay components.
 * Called in CommunityBoard.js
 */
class CommunityBoard extends Component {
  tags = ["all", "study", "health", "relationship"];
  constructor(props) {
    super(props);
    this.state = {
      userUID: null,
      isLoading: true, // true if the server is still loading cards data
      show: false, // false if modal is hidden
      tag: "all", // selected tag to sort
      videoVisible: false,
      cardVisible: true, // starts out showing cards
    };
    this.toggleOpenCards = this.toggleOpenCards.bind(this);
    this.toggleOpenVideos = this.toggleOpenVideos.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userUID: user.uid,
        });
      }
    });
  }

  /**
   * Event handler for tag selection
   */
  handleTag = (event) => {
    event.preventDefault();
    this.setState({
      tag: event.target.name,
    });
  };

  /**
   * toggles between the video and card categories
   */
  toggleOpenCards = () => {
    if (this.state.cardVisible === false) {
      this.setState({ cardVisible: true, videoVisible: false });
    } else {
      console.log("cards already opened.");
    }
  };

  /**
   * toggles between the video and card categories
   */
  toggleOpenVideos = () => {
    if (this.state.videoVisible === false) {
      this.setState({ videoVisible: true, cardVisible: false });
    } else {
      console.log("videos already opened.");
    }
  };

  render() {
    return (
      <div className="community-board">
        {this.props.tagVisible ? (
          <div className="community-board__toggle-buttons">
            <ButtonGroup>
              {this.tags.map((value, index) => (
                <Button
                  name={value}
                  key={index}
                  onClick={this.handleTag}
                  variant="outline-primary"
                  className="rounded-pill community-board__toggle-buttons-btn"
                >
                  {value}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ) : null}
        <ButtonGroup>
          <button className="community-board__toggle-buttons--btn" onClick={this.toggleOpenCards}>
            CARDS
          </button>
          <button className="community-board__toggle-buttons--btn" onClick={this.toggleOpenVideos}>
            VIDEOS
          </button>
        </ButtonGroup>
        <div>{this.state.cardVisible ? <Cards tag={this.state.tag} /> : <VideoDisplay />}</div>
      </div>
    );
  }
}

export default CommunityBoard;

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
      <div className="comminuty-board">
        <div className="comminuty-board__header">
          <h2 className="comminuty-board__header--title">COMMUNITY BOARD</h2>
          <h5 className="comminuty-board__header--prompt">What is your community talking about today?</h5>
        </div>
        {this.state.cardVisible ? (
          <div className="comminuty-board__toggle-buttons">
            <ButtonGroup>
              <Button
                name="all"
                onClick={this.handleTag}
                variant="outline-primary"
                className="rounded-pill comminuty-board__toggle-buttons--btn"
              >
                ALL
              </Button>
              <Button
                name="study"
                onClick={this.handleTag}
                variant="outline-primary"
                className="rounded-pill comminuty-board__toggle-buttons--btn"
              >
                study
              </Button>
              <Button
                name="relationship"
                onClick={this.handleTag}
                variant="outline-primary"
                className="rounded-pill comminuty-board__toggle-buttons--btn"
              >
                relationship
              </Button>
              <Button
                name="health"
                onClick={this.handleTag}
                variant="outline-primary"
                className="rounded-pill comminuty-board__toggle-buttons--btn"
              >
                health
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <div>
            <br />
            <br />
            <br />
          </div>
        )}
        <ButtonGroup>
          <Button
            className="comminuty-board__toggle-buttons--btn"
            variant="light"
            onClick={this.toggleOpenCards}
          >
            Cards
          </Button>
          <Button
            variant="light"
            className="comminuty-board__toggle-buttons--btn"
            onClick={this.toggleOpenVideos}
          >
            Videos
          </Button>
        </ButtonGroup>
        <div>{this.state.cardVisible ? <Cards tag={this.state.tag} /> : <VideoDisplay />}</div>
      </div>
    );
  }
}

export default CommunityBoard;

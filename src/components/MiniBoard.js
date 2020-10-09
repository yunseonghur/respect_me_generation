import React, { Component } from "react";
import "./MiniBoard.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Cards from "./Cards";
import VideoDisplay from "./VideoDisplay";
import { withRouter } from "react-router-dom";

/**
 * A minified version of the community board
 * which doesn't show all videos.
 * Called in Home.js
 */
class MiniBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoVisible: false,
      cardVisible: true, // starts out showing cards
      isCollapsed: true,
      btnText: "See more",
      tag: "all",
      displayMode: "card",
    };
    this.toggleExpandHandler = this.toggleExpandHandler.bind(this);
    this.divStyle = {
      maxHeight: "400px",
    };
  }

  tags = ["study", "relationship", "health"];

  /**
   * Redirects user to CommunityBoard.js
   */
  toCommBoard = () => {
    this.props.history.push({
      pathname: "/communityBoard",
    });
  };

  /**
   * Clicking once expands, another takes user to commBoard
   */
  toggleExpandHandler = () => {
    if (this.state.isCollapsed === true) {
      this.setState({ isCollapsed: false, btnText: "View Full Board" });
      this.divStyle = {
        maxHeight: "700px",
      };
    } else {
      // redirect to full community board
      this.toCommBoard();
    }
  };

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
   * Toggles between the video and card categories
   */
  toggleOpenCards = () => {
    if (this.state.cardVisible === false) {
      this.setState({ cardVisible: true, videoVisible: false });
    } else {
      console.log("cards already opened.");
    }
  };

  /**
   * Toggles between the video and card categories
   */
  toggleOpenVideos = () => {
    if (this.state.videoVisible === false) {
      this.setState({ videoVisible: true, cardVisible: false });
    } else {
      console.log("videos already opened.");
    }
  };

  subscribe = (e) => {
    e.stopPropagation();
    console.log("subscribe");
  };

  render() {
    return (
      <div className="mini-board">
        <div className="mini-board__togglebuttons">
          {this.state.cardVisible ? (
            <div className="mini-board__btngroup--tag">
              <ButtonGroup>
                <Button
                  name="all"
                  className="rounded-pill mini-board__btn__tag"
                  onClick={this.handleTag}
                  variant="outline-primary"
                >
                  ALL
                </Button>
                {this.tags.map((tag) => (
                  <Button
                    key={tag}
                    name={tag}
                    className="rounded-pill mini-board__btn__tag"
                    onClick={this.handleTag}
                    variant="outline-primary"
                  >
                    {tag}
                    <a onClick={this.subscribe} className="mini-board__btn__tag--subscribe">
                      +
                    </a>
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          ) : (
            <div>
              <br />
              <br />
              <br />
            </div>
          )}
          <ButtonGroup className="mini-board__btngroup--type">
            <Button
              className="mini-board__btn--type"
              variant="light"
              onClick={this.toggleOpenCards}
            >
              Cards
            </Button>
            <Button
              className="mini-board__btn--type"
              variant="light"
              onClick={this.toggleOpenVideos}
            >
              Videos
            </Button>
          </ButtonGroup>
        </div>

        <div className="mini-board__visible-board-wrapper">
          <div className="mini-board__visible-board" style={this.divStyle}>
            {this.state.cardVisible ? <Cards tag={this.state.tag} /> : <VideoDisplay />}
          </div>
          {/* <div className="fade" style={{opacity: "1"}}></div> */}
          <button className="mini-board__btn--show" onClick={this.toggleExpandHandler}>
            {this.state.btnText}
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(MiniBoard);

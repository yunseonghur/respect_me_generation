import React, { Component } from "react";
import "./CommunityBoard.css";
import Cards from "../components/Cards";
import VideoDisplay from "../components/VideoDisplay";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import fire from "../fire.js";
import UserVideo from "../components/UserVideo";

const dbRef = fire.database().ref();
/**
 * Handles toggling display of cards and videos.
 * Actual data is being displayed by Card and VideoDisplay components.
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
      videos: [],
    };
    this.toggleOpenCards = this.toggleOpenCards.bind(this);
    this.toggleOpenVideos = this.toggleOpenVideos.bind(this);
  }

  componentDidMount() {
    if (this.props.from === "dashboard") {
      this.getUserInfo();
    }
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
    }
  };

  /**
   * Gets current user's videos from firebase
   */
  getUserInfo() {
    dbRef.child("User").on("value", (snap) => {
      const userInfo = snap.val();
      this.setState(
        {
          videos: userInfo[this.props.userUID]["videos"],
        },
        () => {
          this.getVideos();
        }
      );
    });
  }

  /**
   * Gives an id for each video
   */
  getVideos() {
    let videos = this.state.videos;
    let videoArr = [];
    for (let video in videos) {
      videoArr.push({
        id: videos[video],
      });
    }
    this.setState({ videos: videoArr });
  }

  render() {
    return (
      <div className="community-board">
        {this.props.tagVisible && this.state.cardVisible ? (
          <div className="community-board__toggle-buttons">
            <ButtonGroup>
              {this.tags.map((value, index) =>
                this.state.tag === value ? (
                  <Button
                    id="community-board__toggle-buttons--btn-active"
                    name={value}
                    key={index}
                    onClick={this.handleTag}
                    variant="outline-primary"
                    className="rounded-pill community-board__toggle-buttons--btn"
                  >
                    {value}
                  </Button>
                ) : (
                  <Button
                    name={value}
                    key={index}
                    onClick={this.handleTag}
                    variant="outline-primary"
                    className="rounded-pill community-board__toggle-buttons--btn"
                  >
                    {value}
                  </Button>
                )
              )}
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
        <div>
          {this.state.cardVisible ? (
            <Cards tag={this.state.tag} from={this.props.from} userUID={this.props.userUID} />
          ) : this.props.from === "dashboard" ? (
            <div className="videos">
              {this.state.videos!== undefined?
              Array.from(this.state.videos).map((myVideo) => (
                <UserVideo key={myVideo.id} videoId={myVideo.id} />
              )) : null }
            </div>
          ) : (
            <VideoDisplay />
          )}
        </div>
      </div>
    );
  }
}

export default CommunityBoard;

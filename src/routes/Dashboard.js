import React, { Component } from "react";
import "./Profile.css";
import fire from "../fire.js";
import basicBadge from "../images/badge_flat.jpg";
import advBadge from "../images/adv_badge.png";
import ReactTooltip from "react-tooltip";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import ChallengeEntry from "../components/ChallengeEntry";
import Board from "../components/Board";
import PostsIcon from "../images/PostsIcon";
import AchievementIcon from "../images/AchievementIcon";
import BookMarkIcon from "../images/BookMarkIcon";
import ChallengeIcon from "../images/ChallengeIcon";
import "./Dashboard.css";

const dbRef = fire.database().ref();

/**
 * The user profile page where they can view (and in the future edit/delete)
 * their own posts, along with checking their current points and badge.
 */
class Dashboard extends Component {
  state = {
    userUID: "",
    username: "",
    userImage: "",
    badge: "",
    points: "",
    cards: [],
    videos: [],
    myBadges: [],
    isLoading: true, // true if the server is still loading cards data
    show: false, // false if modal is hidden
    cardSelected: "",
    videoVisible: false,
    cardVisible: true, // starts out showing cards
  };

  // Get current user's name and uid if exist
  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          username: user.displayName,
          userUID: user.uid,
          userImage: user.photoURL,
        });
        this.getUserInfo();
      }
    });
  }

  // Get current user's info: badge, points, cards, and videos
  getUserInfo() {
    dbRef.child("User").on("value", (snap) => {
      const userInfo = snap.val();
      this.setState({
        badge: userInfo[this.state.userUID]["badge"],
        points: userInfo[this.state.userUID]["points"],
        cards: userInfo[this.state.userUID]["cards"],
        videos: userInfo[this.state.userUID]["videos"],
        myBadges: userInfo[this.state.userUID]["myBadges"],
      });
      this.getCardDetails();
      this.getVideos();
      this.getMyBadges();
    });
  }

  // Set a flag for modal to true to appear
  showModal = () => {
    this.setState({ show: true });
  };
  // Set a flag for modal to false to be hidden
  hideModal = () => {
    this.setState({ show: false });
  };

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
  };

  /**
   * Loads in the details needed to make populate each Card component.
   */
  getCardDetails() {
    let cards = this.state.cards;
    let cardDetails = [];
    for (let card in cards) {
      let commentNumber = this.countComments(cards[card].comments);

      cardDetails.push({
        id: card,
        background: cards[card].imgOption,
        text: cards[card].text,
        numComments: commentNumber,
        upvote: this.countUpvotes(cards[card].upvote),
        downvote: this.countDownvotes(cards[card].downvote),
      });
    }
    this.setState({
      cards: cardDetails, // re-set cards state as an array
      isLoading: false,
    });
  }

  countUpvotes = (upvoteObj) => {
    if (upvoteObj != null) {
      return upvoteObj;
    }
    return "0";
  };

  countDownvotes = (downvoteObj) => {
    if (downvoteObj != null) {
      return downvoteObj;
    }
    return "0";
  };

  // Store the current user's videos in an array instead of in json format
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

  /**
   * Load the image of the current users's badges.
   */
  async getMyBadges() {
    let myBadges = this.state.myBadges;
    let badgeImgArr = [];

    await dbRef.child("Badges").on("value", (snap) => {
      const badgeRepo = snap.val();

      for (let index in myBadges) {
        for (let id in badgeRepo) {
          if (myBadges[index] === id) {
            badgeImgArr.push({
              id,
              image: badgeRepo[id].image,
              tag: badgeRepo[id].tag,
              title: badgeRepo[id].title,
            });
          }
        }
      }
      this.setState({ myBadges: badgeImgArr });
    });
  }

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

  toggleOpenVideos = () => {
    if (this.state.videoVisible === false) {
      this.setState({ videoVisible: true, cardVisible: false });
    } else {
      console.log("videos already opened.");
    }
  };

  render() {
    // determines which badge icon to use
    let badgeIcon;
    if (this.state.badge === "basic") {
      badgeIcon = (
        <img className="dashboard_header--badge-icon" src={basicBadge} alt="Basic Badge"></img>
      );
    } else {
      badgeIcon = (
        <img className="dashboard_header--badge-icon" src={advBadge} alt="Advanced Badge"></img>
      );
    }

    return (
      <div>
        {/* header section with the profile picture and points. */}
        <div className="dashboard_header">
          <img
            className="dashboard_header--image rounded-pill"
            src={this.state.userImage}
            alt="Profile Pic"
          />
          <div className="dashboard_header--username">{this.state.username}</div>
          <a data-for="proftt" data-tip={this.state.badge}>
            {badgeIcon}
          </a>
          <a className="dashboard_header--points" data-for="proftt" data-tip="Your Points">
            {this.state.points} Points
          </a>
          <ReactTooltip id="proftt" place="bottom" type="warning" effect="float" />
        </div>

        <Tabs className="dashboard_tabs" defaultTab="cards">
          <TabList className="dahsboard_tabs__list">
            <Tab tabFor="cards">
              <PostsIcon className="dashboard_tabs__list--tab-icon" />
              <span className="dashboard_tabs__list--tab-text">Cards</span>
            </Tab>
            <Tab tabFor="challenges">
              <ChallengeIcon className="dashboard_tabs__list--tab-icon" />
              <span className="dashboard_tabs__list--tab-text">Challenges</span>
            </Tab>
            <Tab tabFor="achievements">
              <AchievementIcon className="dashboard_tabs__list--tab-icon" />
              <span className="dashboard_tabs__list--tab-text">Achievements</span>
            </Tab>
            <Tab tabFor="badges">
              <BookMarkIcon className="dashboard_tabs__list--tab-icon" />
              <span className="dashboard_tabs__list--tab-text">Saved</span>
            </Tab>
          </TabList>
          <TabPanel tabId="cards">
            <div className="cards">
              <Board />
            </div>
          </TabPanel>
          <TabPanel tabId="challenges">
            <div className="challenges"></div>
          </TabPanel>
          <TabPanel tabId="achievements">
            <div className="dashboard_achievements">
              <h2 className="dashboard_achievements--title">Active Challenges</h2>
              <ChallengeEntry
                title="Catching some more zZZ's"
                details="Sleep is important for immune function and helps you tackle a new day!"
                status="accepted"
              />
              <h2 className="dashboard_achievements--title">Completed Challenges</h2>
              <ChallengeEntry
                title="Foods of Success"
                details="Eat at least 4 of your five a day."
                status="completed"
              />
            </div>
          </TabPanel>
          <TabPanel tabId="saved">
            <div className="profile_saved-grid"></div>
          </TabPanel>
        </Tabs>
      </div> // closing root node
    );
  } // closing render function
}

export default Dashboard;

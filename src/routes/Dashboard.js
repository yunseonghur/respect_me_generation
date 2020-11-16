import React, { Component } from "react";
import "./Profile.css";
import fire from "../fire.js";
import basicBadge from "../images/badge_flat.jpg";
import advBadge from "../images/adv_badge.png";
import ReactTooltip from "react-tooltip";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
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
    myBadges: [],
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
    });
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
          {this.state.userImage === "" ? (
            <div className="dashboard_header--image_loader" />
          ) : (
            <img
              className="dashboard_header--image rounded-pill"
              src={this.state.userImage}
              alt="Profile Pic"
            />
          )}

          <div className="dashboard_header--username">{this.state.username}</div>
          <div className="dashboard_header__points">
            <span data-for="proftt" data-tip={this.state.badge}>
              {badgeIcon}
            </span>
            <span
              className="dashboard_header__points__info"
              data-for="proftt"
              data-tip="Your Points"
            >
              <span className="dashboard_header__points__info--number">{this.state.points}</span>
              <span className="dashboard_header__points__info--text"> Points</span>
            </span>
            <ReactTooltip id="proftt" place="bottom" type="warning" effect="float" />
          </div>
        </div>

        <Tabs className="dashboard_tabs" defaultTab="cards">
          <TabList className="dahsboard_tabs__list">
            <Tab tabFor="cards">
              <PostsIcon className="dashboard_tabs__list--tab-icon" />
              <span className="dashboard_tabs__list--tab-text">Posts</span>
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
            <div className="dashboard_achievements"></div>
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

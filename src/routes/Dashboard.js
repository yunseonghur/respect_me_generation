import React, { Component } from "react";
import fire from "../fire.js";
import basicBadge from "../images/badge_flat.jpg";
import advBadge from "../images/adv_badge.png";
import ReactTooltip from "react-tooltip";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import CommunityBoard from "./CommunityBoard";
import PostsIcon from "../images/PostsIcon";
import AchievementIcon from "../images/AchievementIcon";
import BookMarkIcon from "../images/BookMarkIcon";
import ChallengeIcon from "../images/ChallengeIcon";
import "react-web-tabs/dist/react-web-tabs.css";
import "./Dashboard.css";
import ChallengeEntry from "../components/ChallengeEntry";
import ChallengeGameModal from "../components/ChallengeGameModal";
import ChallengeNoEntry from '../components/ChallengeNoEntry';
import ChallengeCurrent from '../components/ChallengeCurrent';
import Achievement from "../components/Achievement.js";
import SavedResources from "../components/SavedResources.js";

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
    videos: [],
    completedChallenges: [],
    activeChallenges: [],
    challengeModalVisible: false,
    numberOfActiveChallenges: ""
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
        completedChallenges: userInfo[this.state.userUID]['completedChallenges'],
        activeChallenges: userInfo[this.state.userUID]['activeChallenges']
      });
    });
    this.getCompletedChallenges();
    this.getActiveChallenges();
  }


  getCompletedChallenges() {
      // read all resources from db
      dbRef.child('User/'+ this.state.userUID + '/completedChallenges/').once('value').then(function(snap) {
          const result = snap.val();
          console.log(result);
          return result;
      })
          .then((res) => {
              this.formatCompletedChallenges(res);
          })
          .catch((err) => {
              console.log(err);
          })
  }

  getActiveChallenges() {
    // read all resources from db
    dbRef.child('User/'+ this.state.userUID + '/activeChallenges/').once('value').then(function(snap) {
        const result = snap.val();
        console.log(result);
        return result;
    })
        .then((res) => {
            this.formatActiveChallenges(res);
        })
        .catch((err) => {
            console.log(err);
        })
}
    //Store the user's active challenges in a simple array instead of in json format
    formatActiveChallenges(activeChallenges) {
      // let activeChallenges = this.state.activeChallenges;
      let activeChallengesArr = [];
      for (let activeChallenge in activeChallenges){
        activeChallengesArr.push(activeChallenges[activeChallenge]);
      }
      this.setState({activeChallenges: activeChallengesArr});
      
  }

    // Store the current user's completed challenges in an array instead of json format
    formatCompletedChallenges(completedChallenges) {
        // let completedChallenges = this.state.completedChallenges;
        let completedChallengesArr = [];

        for (let challenge in completedChallenges){
            // let title = await this.lookupChallengesTitle(challenge);
            completedChallengesArr.push({
                id: challenge,
                endTime: completedChallenges[challenge].endTime,
                startTime: completedChallenges[challenge].startTime,
                title: completedChallenges[challenge].title
            })
        }
        this.setState({completedChallenges: completedChallengesArr});
    }

    getNumberOfActiveChallenges() {
      if (Object.keys(this.state.activeChallenges).length) {
        this.setState({
          numberOfActiveChallenges: Object.keys(this.state.activeChallenges).length
        })
      } else {
        this.setState({
          numberOfActiveChallenges: 0
        })
      }
    }

  showChallengeModal = () => {
    this.setState({ challengeModalVisible: !this.state.challengeModalVisible });
  };

  hideChallengeModal = () => {
    this.setState({challengeModalVisible: false})
  }

  updateActiveChallenges = () => {
    dbRef.child('User').on('value', snap => {
      const userInfo = snap.val();
      this.setState({
          activeChallenges: userInfo[this.state.userUID]['activeChallenges']
      });
      this.getActiveChallenges();
      this.getCompletedChallenges();
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
            <Tab tabFor="saved">
              <BookMarkIcon className="dashboard_tabs__list--tab-icon" />
              <span className="dashboard_tabs__list--tab-text">Saved</span>
            </Tab>
          </TabList>
          <TabPanel tabId="cards">
            <div className="cards">
              <CommunityBoard from="dashboard" userUID={this.state.userUID} />
            </div>
          </TabPanel>
          <TabPanel tabId="challenges">
            <div className="challenges">
            {this.state.numberOfActiveChallenges < 3 ?
                (<button onClick={this.showChallengeModal}>Start Challenge!</button>) : null
              }
                <h2 className="profile_challenges--title">Active Challenges</h2>
                    {this.state.activeChallenges !== undefined ?
                    Array.from(this.state.activeChallenges).map((myActiveChallenge) =>
                        <ChallengeCurrent
                            title={myActiveChallenge.title}
                            startTime={myActiveChallenge.startTime}
                            userUID={this.state.userUID}
                            badgeId={myActiveChallenge.badgeID}
                            updateActiveChallenges={this.updateActiveChallenges}
                            challengeId={myActiveChallenge.challengeId}
                            getcompleteChallenge={this.getcompleteChallenge}/>) : <ChallengeNoEntry/>
                    }
                <h2 className="profile_challenges--title">Completed Challenges</h2>
                    {this.state.completedChallenges !== undefined ?
                    Array.from(this.state.completedChallenges).map((myCompletedChallenge) =>
                        <ChallengeEntry
                            title={myCompletedChallenge.title}
                            endTime={myCompletedChallenge.endTime}/>) : []
                    }
            </div>
          </TabPanel>
          <TabPanel tabId="achievements">
            <div className="dashboard_achievements">
              <Achievement userUID={this.state.userUID} />
            </div>
          </TabPanel>
          <TabPanel tabId="saved">
            <div className="dashboard-saved__grid">
              <SavedResources userUID={this.state.userUID} />
            </div>
          </TabPanel>
        </Tabs>
        <ChallengeGameModal
          show={this.state.challengeModalVisible}
          onHide={this.showChallengeModal}
          hideChallengeModal={this.hideChallengeModal}
          updateActiveChallenges={this.updateActiveChallenges}
          getRandomChallenge={this.getRandomChallenge}
          activeChallenges={this.state.activeChallenges}
          completedChallenges={this.state.completedChallenges}
          userUID={this.state.userUID}
        />
      </div> // closing root node
    );
  } // closing render function
}

export default Dashboard;

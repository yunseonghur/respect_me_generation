import React, { Component } from "react";
import "./Challenge.css";
import fire from "../fire.js";
import ChallengeEntry from "../components/ChallengeEntry";
import ChallengeNoEntry from "../components/ChallengeNoEntry";
import ChallengeCurrent from "../components/ChallengeCurrent";
import ChallengeGameModal from "../components/ChallengeGameModal";

const db = fire.database();

/**
 * Displays a Active and Completed Challenges in Dashboard.
 */
class Challenge extends Component {
    state = {
      completedChallenges: [],
      activeChallenges: [],
      challengeModalVisible: false,
      numberOfActiveChallenges: ""
    }

  componentDidMount(){
    db.ref().child('User').on('value', snap => {
      const userInfo = snap.val();
        this.formatCompletedChallenges(userInfo[this.props.userUID]["completedChallenges"])
        this.formatActiveChallenges(userInfo[this.props.userUID]["activeChallenges"])
    });
  }

      /**
   * Gets the current user's completed challenges
   */
  async getCompletedChallenges() {
    // read all resources from db
    db.ref()
      .child("User/" + this.props.userUID + "/completedChallenges/")
      .once("value")
      .then(function (snap) {
        const result = snap.val();
        return result;
      })
      .then((res) => {
        this.formatCompletedChallenges(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Store the current user's completed challenges in an array instead of json format
  formatCompletedChallenges(completedChallenges) {
    let completedChallengesArr = [];
    console.log(completedChallenges);
    for (let challenge in completedChallenges) {
      completedChallengesArr.push({
        id: challenge,
        endTime: completedChallenges[challenge].endTime,
        startTime: completedChallenges[challenge].startTime,
        title: completedChallenges[challenge].title,
      });
    }
    this.setState({ completedChallenges: completedChallengesArr,
      isCompletedMounted: true });
  }

  //Store the user's active challenges in a simple array instead of in json format
  formatActiveChallenges(activeChallenges) {
    let activeChallengesArr = [];
    for (let activeChallenge in activeChallenges) {
      activeChallengesArr.push(activeChallenges[activeChallenge]);
    }
    this.setState({ activeChallenges: activeChallengesArr,
      isActiveMounted: true });
    console.log(activeChallengesArr);

    this.getNumberOfActiveChallenges(activeChallengesArr);
  }

  /**
   * Gets the current user's active challenges
   */
  async getActiveChallenges() {
    // read all resources from db
    db.ref()
      .child("User/" + this.props.userUID + "/activeChallenges/")
      .once("value")
      .then(function (snap) {
        const result = snap.val();
        return result;
      })
      .then((res) => {
        this.formatActiveChallenges(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

    /**
   * Sets the number of active challeges
   */
  getNumberOfActiveChallenges(activeChallengesArr) {
    if (Object.keys(activeChallengesArr).length) {
      this.setState({
        numberOfActiveChallenges: Object.keys(activeChallengesArr).length      });
    } else {
      this.setState({
        numberOfActiveChallenges: 0,
      });
    }
  }

  /**
   * Updates the challenges screen
   */
  updateActiveChallenges = () => {
      this.getActiveChallenges();
      this.getCompletedChallenges();
  };

  /**
   * Displays the challenge game modal
   */
  showChallengeModal = () => {
    this.setState({ challengeModalVisible: !this.state.challengeModalVisible });
  
  };

  /**
   * Hides the challenge game modal
   */
  hideChallengeModal = () => {
    this.setState({ challengeModalVisible: false });
  };

  render() {
      return (
        <div className="challenges">
                {this.state.numberOfActiveChallenges < 3 ? (
                  <button className="dashboard_challenges--button" onClick={this.showChallengeModal}>
                    Start Challenge!
                  </button>
                ) : null}
                <div className="dashboard_challenges__title">
                  <span className="dashboard_challenges__title--active">Active Challenges</span>
                  <span className="dashboard_challenges__title--count">
                    {this.state.numberOfActiveChallenges} of 3 active challenges
                  </span>
                </div>
  
                <div className="dashboard_challenges--entries">
                  {this.state.activeChallenges === undefined ||
                  this.state.numberOfActiveChallenges === 0 ? (
                    <ChallengeNoEntry />
                  ) : (
                    Array.from(this.state.activeChallenges).map((myActiveChallenge) => (
                      <ChallengeCurrent
                        key={myActiveChallenge.challengeId}
                        title={myActiveChallenge.title}
                        startTime={myActiveChallenge.startTime}
                        userUID={this.props.userUID}
                        badgeId={myActiveChallenge.badgeID}
                        updateActiveChallenges={this.updateActiveChallenges}
                        challengeId={myActiveChallenge.challengeId}
                      />
                    ))
                  )}
                </div>
                <h2 className="dashboard_challenges__title">Completed Challenges</h2>
                {this.state.completedChallenges !== undefined
                  ? Array.from(this.state.completedChallenges).map((myCompletedChallenge) => (
                      <ChallengeEntry
                        key={myCompletedChallenge.id}
                        badgeID={myCompletedChallenge.id}
                        title={myCompletedChallenge.title}
                        endTime={myCompletedChallenge.endTime}
                      />
                    ))
                  : []}
              <div>
                <ChallengeGameModal
                  show={this.state.challengeModalVisible}
                  onHide={this.showChallengeModal}
                  hideChallengeModal={this.hideChallengeModal}
                  updateActiveChallenges={this.updateActiveChallenges}
                  activeChallenges={this.state.activeChallenges}
                  completedChallenges={this.state.completedChallenges}
                  userUID={this.props.userUID}
                />
              </div>
            </div>
      );
    }
}

export default Challenge;

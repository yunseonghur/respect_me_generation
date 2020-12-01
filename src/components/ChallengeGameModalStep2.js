import React, { Component } from "react";
import "./ChallengeGameModalStep1.css";
import ChallengeActive from "../components/ChallengeActive";
import fire from "../fire.js";
import ChallengeNoEntry from "./ChallengeNoEntry";

/**
 * Represent the first page of the challenge game modal.
 *
 * @param {object} activeChallenges a list active challenges
 * @param {object} completedChallenges a list of completed challenges
 * @param {string} userUID uid of the current user
 * @param {string} category a category selected by a user
 * @param {number} currentStep page number for challenge game modal
 */
class ChallengeGameModalStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      randomChallenge: undefined,
      previousChallenge: "",
    };
    this.getRandomChallenge = this.getRandomChallenge.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.category !== prevProps.category ||
      prevState.randomChallenge === this.state.randomChallenge
    ) {
      this.getRandomChallenge();
    }
  }

  /**
   * Picks a random challenge from challenge entries
   */
  async getRandomChallenge() {
    let inactiveChallengesKeys = [];
    for (let actChallenge in this.props.activeChallenges) {
      inactiveChallengesKeys.push(this.props.activeChallenges[actChallenge].challengeId);
    }
    for (let compChallenge in this.props.completedChallenges) {
      inactiveChallengesKeys.push(this.props.completedChallenges[compChallenge].id);
    }
    let dateObject = new Date();
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    let date = day + "/" + month + "/" + year;
    // get a list of potential challenges which the user hasn't completed yet
    let potentialChallenges = [];
    let potentialChallengesKeys = [];
    let challengesRef = fire.database().ref("Challenges/" + this.props.category);
    await challengesRef.once("value", (snap) => {
      let challenges = snap.val();
      for (let challenge in challenges) {
        let tempChallenge = challenges[challenge];
        tempChallenge.challengeId = challenge;
        tempChallenge.startTime = date;
        potentialChallenges.push(tempChallenge);
        potentialChallengesKeys.push(challenge);
      }
    });

    // add previously shown challenge as inactive
    if (this.state.randomChallenge !== undefined) {
      inactiveChallengesKeys.push(this.state.randomChallenge.challengeId);
    }
    // select random challenge from list potential challenges
    let uncompletedChallenges = potentialChallengesKeys.filter(
      (x) => !inactiveChallengesKeys.includes(x)
    );
    let randomNumber = Math.floor(Math.random() * uncompletedChallenges.length);
    let potentialChallengesIndex = potentialChallengesKeys.findIndex(
      (element) => element === uncompletedChallenges[randomNumber]
    );
    let randomChallenge = potentialChallenges[potentialChallengesIndex];

    if (uncompletedChallenges === 0) {
      this.setState({ randomChallenge: undefined });
    }
    this.setState({ randomChallenge: randomChallenge });
  }

  /**
   * Called when user skips the randomly picked challenge
   */
  skipChallenge = () => {
    this.getRandomChallenge();
  };

  /**
   * Called when user accepts the randomly picked challenge
   */
  addChallenge = () => {
    fire
      .database()
      .ref()
      .child(
        "User/" + this.props.userUID + "/activeChallenges/" + this.state.randomChallenge.challengeId
      )
      .set(this.state.randomChallenge);
    this.props.hideChallengeModal();
    this.props.updateActiveChallenges();
    this.props.resetModalStep();
  };

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <div>
        <div className="challenge-game-modal__body--prompt">{this.props.category}</div>
        {this.state.randomChallenge !== undefined ? (
          <ChallengeActive
            title={this.state.randomChallenge.title}
            startTime={this.state.randomChallenge.startTime}
            addChallenge={this.addChallenge}
            skipChallenge={this.skipChallenge}
          ></ChallengeActive>
        ) : (
          <ChallengeNoEntry title="You have no more challenges to skip" />
        )}
      </div>
    );
  }
}

export default ChallengeGameModalStep2;

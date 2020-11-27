import React from "react";
import "./ChallengeEntry.css";
import fire from "../fire.js";
import Question from "../images/question.png";

/**
 * Represent a challenge entry in game modal.
 * Called in ChallengeGameModalStep2.js
 * 
 * @param {string} userUID uid of the current user
 * @param {string} challengeId an id of this challenge
 * @param {string} badgeId an id of the badge associated with this challenge
 * @param {string} title a title of this challenge
 * @param {string} startTime a timestamp of start date 
 */
const ChallengeCurrent = (props) => {
  const cancelChallenge = () => {
    fire
      .database()
      .ref()
      .child("User/" + props.userUID + "/activeChallenges/" + props.challengeId)
      .remove();
    props.updateActiveChallenges();
  };

  const completeChallenge = () => {
    let dateObject = new Date();
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    let completedChallenge = {
      title: props.title,
      startTime: props.startTime,
      endTime: day + "/" + month + "/" + year,
    };
    
    console.log(completedChallenge);
    console.log(props.challengeId);
    fire
      .database()
      .ref()
      .child("User/" + props.userUID + "/completedChallenges/")
      .child(props.challengeId)
      .set(completedChallenge);
    fire
      .database()
      .ref()
      .child("User/" + props.userUID + "/activeChallenges/" + props.challengeId)
      .remove();
    // write a badge id to myBadges node
    fire
      .database()
      .ref()
      .child("User/" + props.userUID + "/")
      .child("myBadges")
      .update({ [props.badgeId]: true });
    props.updateActiveChallenges();
  };

  return (
    <div className="challenge-entry">
      {/* challenge image */}
      <img src={Question} className="challenge-entry_img" />

      {/* text */}
      <div className="challenge-entry_text">
        <h3 className="challenge-entry_text--title">{props.title}</h3>
        <div className="challenge-entry_text--buttons">
          <button onClick={completeChallenge}>I'm done!</button>
          <button onClick={cancelChallenge}>Cancel</button>
        </div>
      </div>

      {/* challenge status */}
      <div className="challenge-entry_status">{props.startTime}</div>
    </div>
  );
};

export default ChallengeCurrent;

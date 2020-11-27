import React from "react";
import "./ChallengeEntry.css";
import Question from "../images/question.png";


/**
 * Represent a challenge entry in game modal.
 * Called in ChallengeGameModalStep2.js
 * 
 * @param {string} title a title of the challenge
 * @param {function} addChallenge a function to add this challenge
 * @param {function} skipChallenge a function to skip this challenge
 */
const ChallengeActive = (props) => {
  return (
    <div className="challenge-entry">
      {/* challenge image */}
      <img src={Question} className="challenge-entry_img" />

      {/* text */}
      <div className="challenge-entry_text">
        <h3 className="challenge-entry_text--title">{props.title}</h3>
        <div className="challenge-entry_text--buttons">
          <button onClick={props.addChallenge}>Add challenge!</button>
          <button onClick={props.skipChallenge}>Skip</button>
        </div>
        {/* challenge status */}
      </div>
      <div className="challenge-entry_status">{props.startTime}</div>
    </div>
  );
};

export default ChallengeActive;

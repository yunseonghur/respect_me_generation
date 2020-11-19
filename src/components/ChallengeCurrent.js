import React from 'react';
import "./ChallengeEntry.css";

const ChallengeCurrent = (props) => {

    return (
        <div className="challenge-entry">

          {/* challenge image */}
          <div className="challenge-entry_img">
          </div>

          {/* text */}
          <div className="challenge-entry_text">
            <h3 className="challenge-entry_text--title">
                {props.title}
            </h3>
            <div className="challenge-entry_text--buttons">
                <button onClick={props.completeChallenge}>I'm done!</button>
                <button onClick={props.cancelChallenge}>Cancel</button>
            </div>
          </div>

          {/* challenge status */}
          <div className="challenge-entry_status">
              {props.startTime}
          </div>
      </div>
    )
}

export default ChallengeCurrent;
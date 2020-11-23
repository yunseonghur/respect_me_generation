import React from 'react';
import "./ChallengeEntry.css";

const ChallengeActive = (props) => {

    return (
        <div className="challenge-entry">

          {/* challenge image */}
          {/* <div className="challenge-entry_img">
          </div> */}

          {/* text */}
          <div className="challenge-entry_text">
              {/* challenge status */}
          <div className="challenge-entry_status">
                {props.startTime}
            </div>
            <h3 className="challenge-entry_text--title">
                {props.title}
            </h3>
            <div className="challenge-entry_text--buttons">
                <button onClick={props.addChallenge}>Add challenge!</button>
                <button onClick={props.skipChallenge}>Skip</button>
            </div>
          </div>
      </div>
    )
}

export default ChallengeActive;
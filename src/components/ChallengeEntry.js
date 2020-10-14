import React from 'react';
import "./ChallengeEntry.css";

const ChallengeEntry = (props) => {

    const recordTaskComplete = () => {
        console.log("completed!");
    }

    const recordTaskSkipped = () => {
        console.log("skipped!");
    }

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
            <div className="challenge-entry_text--details">
                {props.details}
            </div>
            <div className="challenge-entry_text--buttons">
                <button onClick={recordTaskComplete}>I'm done!</button>
                <button onClick={recordTaskSkipped}>Skip</button>
            </div>
          </div>

          {/* challenge status */}
          <div className="challenge-entry_status">
              {props.status}
          </div>
      </div>
    );
  }
  
  export default ChallengeEntry;
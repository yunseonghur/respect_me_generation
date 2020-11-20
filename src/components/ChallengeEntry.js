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

          {/* challenge image
          <div className="challenge-entry_img">
          </div> */}

          {/* text */}
          <div className="challenge-entry_text">
            <h3 className="challenge-entry_text--title">
                {props.title}
                this can be potentially lots of text
            </h3>
            <h4>this is the start date</h4>
            <div className="challenge-entry_text--details">
                {props.details}
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </div>
            <div className="challenge-entry_text--buttons">
                <button onClick={recordTaskComplete}>I'm done!</button>
                <button onClick={recordTaskSkipped}>Skip</button>
            </div>
          </div>
      </div>
    );
  }
  
  export default ChallengeEntry;
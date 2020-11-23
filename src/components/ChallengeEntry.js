import React from "react";
import "./ChallengeEntry.css";

const ChallengeEntry = (props) => {
  return (
    <div id={props.key} className="challenge-entry">
      {/* challenge image */}
          <div className="challenge-entry_img">
          </div>


      <div className="challenge-entry_text">
        <h3 className="challenge-entry_text--title">
          {props.title}
        </h3>
      </div>

      {/* challenge status */}
      <div className="challenge-entry_status">{props.endTime}</div>
    </div>
  );
};

export default ChallengeEntry;

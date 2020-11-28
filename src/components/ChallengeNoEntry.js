import React from "react";
import "./ChallengeNoEntry.css";

/**
 * Gets displayed when there's no active challenges for the current user.
 * Called in Dashboard.js
 */
const ChallengeNoEntry = () => {
  return (
    <div className="challenge-entry">
      {/* text */}
      <div className="challenge-no-entry_text">
        <h3 className="challenge-entry_text--title">Click Start Challenge to add challenges!</h3>
      </div>
    </div>
  );
};

export default ChallengeNoEntry;

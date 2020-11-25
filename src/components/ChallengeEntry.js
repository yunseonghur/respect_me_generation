import React, { useState, useEffect } from "react";
import "./ChallengeEntry.css";
import fire from "../fire.js";

const ChallengeEntry = (props) => {
  const dbRef = fire.database().ref();
  const [badgeImg, setBadgeImg] = useState();
  useEffect(() => {
    getMyBadges();
  });
  /**
   * Load the image of the current users's badges.
   */
  const getMyBadges = () => {
    var badgeImgTmp = "";
    dbRef.child("Badges").on("value", (snap) => {
      const badgeRepo = snap.val();

      for (let id in badgeRepo) {
        if (id === props.badgeID) {
          badgeImgTmp = badgeRepo[props.badgeID].image;
        }
        // console.log(id);
      }
      setBadgeImg(badgeImgTmp);
    });
  };
  return (
    <div id={props.key} className="challenge-entry">
      {/* challenge image */}
      <img src={badgeImg} className="challenge-entry_img" />

      <div className="challenge-entry_text">
        <h3 className="challenge-entry_text--title">{props.title}</h3>
      </div>

      {/* challenge status */}
      <div className="challenge-entry_status">{props.endTime}</div>
    </div>
  );
};

export default ChallengeEntry;

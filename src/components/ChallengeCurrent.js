import React from 'react';
import "./ChallengeEntry.css";
import fire from "../fire.js";


const ChallengeCurrent = (props) => {

    const cancelChallenge = () => {
        console.log("cancel active challenge")
        console.log(props.userUID);
        console.log(props.challengeId);
        fire.database().ref().child('User/'+ props.userUID + '/activeChallenges/' + props.challengeId).remove();
        props.updateActiveChallenges();
    }

    const completeChallenge = () => {
        let dateObject = new Date();
        let day = dateObject.getDate();
        let month = dateObject.getMonth() +1;
        let year = dateObject.getFullYear();
        let completedChallenge = {
                title: props.title,
                startTime: props.startTime,
                endTime: day + "/" + month + "/" + year
        }
            
        // }
        console.log(completedChallenge);
        console.log(props.challengeId);
        fire.database().ref().child('User/'+ props.userUID + '/completedChallenges/').child(props.challengeId).set(completedChallenge);
        fire.database().ref().child('User/'+ props.userUID + '/activeChallenges/' + props.challengeId).remove();
        props.updateActiveChallenges();
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
            <div className="challenge-entry_text--buttons">
                <button onClick={completeChallenge}>I'm done!</button>
                <button onClick={cancelChallenge}>Cancel</button>
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
import React, { Component } from "react";
import "./ChallengeGameModalStep1.css";
import ChallengeActive from '../components/ChallengeActive';
import fire from "../fire.js";


/**
 * Represent the first page of the challenge game modal.
 *
 * @param {object} activeChallenges a list active challenges
 * @param {object} completedChallenges a list of completed challenges
 * @param {string} userUID uid of the current user
 * @param {string} category a category selected by a user
 * @param {number} currentStep page number for challenge game modal
 */
class ChallengeGameModalStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            randomChallenge: ''
        }
        this.getRandomChallenge = this.getRandomChallenge.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.category !== prevProps.category || prevState.randomChallenge === this.state.randomChallenge) {
            this.getRandomChallenge();
        }
    }

    /**
     * Picks a random challenge from challenge entries
     */
    async getRandomChallenge() {
        let activeChallengesKeys = [];
        let completedChallengeKeys = [];
        for (let actChallenge in this.props.activeChallenges) {
            activeChallengesKeys.push(this.props.activeChallenges[actChallenge].challengeId)
        }

        for (let compChallenge in this.props.completedChallenges) {
            completedChallengeKeys.push(this.props.completedChallenges[compChallenge].id)
        }
        let dateObject = new Date();
        let day = dateObject.getDate();
        let month = dateObject.getMonth() + 1;
        let year = dateObject.getFullYear();
        let date = day + "/" + month + "/" + year;
        // get a list of potential challenges which the user hasn't completed yet
        let potentialChallenges = [];
    
        let challengesRef = fire.database().ref("Challenges/"+this.props.category);
        await challengesRef.once('value', snap => {
            let challenges = snap.val();
            for (let challenge in challenges ){
                let tempChallenge = challenges[challenge];
                tempChallenge.challengeId = challenge;
                tempChallenge.startTime = date;
                potentialChallenges.push(tempChallenge);
            }
        })
        // select random challenge from list potential challenges
    
        let newChallengeBool = false;
        let randomChallenge;
        let randomChallengeKey;
        while (!newChallengeBool) {
            if (potentialChallenges.length === 0) {
                break;
            }
            let randomNumber = Math.floor(Math.random() * potentialChallenges.length);
            randomChallenge = potentialChallenges[randomNumber];
            randomChallengeKey = randomChallenge.challengeId;

            // Check if randomChallenge is not already active, completed and not being shown
            if (!activeChallengesKeys.includes(randomChallengeKey) &&
             !completedChallengeKeys.includes(randomChallengeKey) &&
             this.state.randomChallenge.challengeId !== randomChallengeKey) {
                newChallengeBool = true;
            } 
            
        }
        // get user id to set the active challenge as the random one.
        this.setState({randomChallenge: randomChallenge});
    }
  
    /**
     * Called when user skips the randomly picked challenge
     */
    skipChallenge = () => {
        this.getRandomChallenge();
    }

    /**
     * Called when user accepts the randomly picked challenge
     */
    addChallenge = () => {
        fire.database().ref().child('User/'+ this.props.userUID + '/activeChallenges/' + this.state.randomChallenge.challengeId).set(this.state.randomChallenge);
        this.props.hideChallengeModal();
        this.props.updateActiveChallenges();
        this.props.resetModalStep();
    }

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }

        return(
            <div>
                <div className="challenge-game-modal__body--prompt">{this.props.category}</div>
                <ChallengeActive
                    title={this.state.randomChallenge.title}
                    startTime={this.state.randomChallenge.startTime}
                    addChallenge={this.addChallenge}
                    skipChallenge={this.skipChallenge}
                ></ChallengeActive>
            </div>
            
        )
    }
}

export default ChallengeGameModalStep2;

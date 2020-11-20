import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import challenge from "../images/challenge.gif";
import "./ChallengeGameModalStep1.css";
import ChallengeActive from '../components/ChallengeActive';
import fire from "../fire.js";


class ChallengeGameModalStep2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            randomChallenge: ''
        }
        this.getRandomChallenge = this.getRandomChallenge.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.getRandomChallenge();
        }
    }

    async getRandomChallenge() {
        console.log("getting random challenge");
        console.log(this.props.activeChallenges);
        let dateObject = new Date();
        let day = dateObject.getDate();
        let month = dateObject.getMonth() + 1;
        let year = dateObject.getFullYear();
        let date = day + "/" + month + "/" + year;
        // // get a list of potential challenges which the user hasn't completed yet
        let potentialChallenges = [];
    
        let challengesRef = fire.database().ref("Challenges/"+this.props.category);
        await challengesRef.once('value', snap => {
            let challenges = snap.val();
            console.log(challenges)
            for (let challenge in challenges ){
                let tempChallenge = challenges[challenge];
                tempChallenge.challengeId = challenge;
                tempChallenge.startTime = date;
                potentialChallenges.push(tempChallenge);
            }
        })
        // // select random challenge from list potential challenges
    
        console.log(potentialChallenges);
        let newChallengeBool = false;
        let randomChallenge;
        let randomChallengeKey;
        let completedChallenges = this.props.completedChallenges;
        let potentialCopy = potentialChallenges;
        while (!newChallengeBool) {
            if (potentialCopy.length === 0) {
                console.log("no more potential challenges");
            }
            let randomNumber = Math.floor(Math.random() * potentialCopy.length);
            randomChallenge = potentialCopy[randomNumber];
            console.log(randomChallenge);
            randomChallengeKey = randomChallenge.challengeId; // get unique challenge id
            let foundCompleted = false;
    
            // see if random challenge picked has been completed already
            for (let challenge in completedChallenges) {
    
                try {
                    if (challenge === this.props.activeChallenge.challengeId) {
                        break;
                    }
                } catch (error) {
                    console.log("no current active challenge")
                } finally {
                    if (challenge === randomChallengeKey ) {
                        console.log(challenge);
                        console.log(randomChallengeKey);
                        console.log("Challenge completed already");
                        foundCompleted = true;
                        // eslint-disable-next-line no-loop-func
                        potentialCopy = potentialCopy.filter(item => item !== randomChallenge);
                        break;
                    }
                }
            }
            if (!foundCompleted) {
                console.log("Found new random challenge");
                newChallengeBool = true;
            }
        }
        console.log("randomChallenge is: ")
        console.log(randomChallenge);
    
        // // // get user id to set the active challenge as the random one.
        this.setState({randomChallenge: randomChallenge});
    }
  

    skipChallenge = () => {
        this.getRandomChallenge();
    }

    addChallenge = () => {
        console.log('add challenge to dashboard')
        fire.database().ref().child('User/'+ this.props.userUID + '/activeChallenges/' + this.state.randomChallenge.challengeId).set(this.state.randomChallenge);
        this.props.hideChallengeModal();
        // this.props.updateActiveChallenges(this.props.userUID);
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

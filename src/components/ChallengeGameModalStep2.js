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
            title: '',
            startTime:''
        }
        this.getRandomChallenge = this.getRandomChallenge.bind(this);

    }

    async getRandomChallenge(event) {
        console.log("getting random challenge");
        console.log("getting random challenge");
        const { name } = event.target;
        console.log(name);
        let dateObject = new Date();
        let day = dateObject.getDay() + 1;
        let month = dateObject.getMonth() + 1;
        let year = dateObject.getFullYear();
        let date = day + "/" + month + "/" + year;
        // // get a list of potential challenges which the user hasn't completed yet
        let potentialChallenges = [];
  
        let challengesRef = fire.database().ref("Challenges/"+name);
        await challengesRef.once('value', snap => {
            let challenges = snap.val();
            console.log(challenges);
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
        // console.log("potential copy")
        // console.log(potentialCopy[1]);
        while (!newChallengeBool) {
            if (potentialCopy.length === 0) {
                console.log("no more potential challenges");
            }
            let randomNumber = Math.floor(Math.random() * potentialCopy.length);
            randomChallenge = potentialCopy[randomNumber];
            // console.log(randomChallenge);
            // randomChallengeKey = randomChallenge.challengeId; // get unique challenge id
            let foundCompleted = false;
  
  
            // see if random challenge picked has been completed already
            for (let challenge in completedChallenges) {
  
                try {
                    if (challenge === this.state.activeChallenge.activeChallenge.challengeId) {
                        break;
                    }
                } catch (error) {
                    console.log("no current active challenge")
                } finally {
                    if (challenge === randomChallengeKey ) {
                        console.log(potentialCopy);
                        console.log(challenge);
                        console.log(randomChallengeKey);
                        console.log("Challenge completed already");
                        foundCompleted = true;
                        // eslint-disable-next-line no-loop-func
                        potentialCopy = potentialCopy.filter(item => item !== randomChallenge);
                        console.log(potentialCopy);
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
        // // get user id to set the active challenge as the random one.
        // dbRef.child('User/'+ this.state.userUID + '/activeChallenge').set(randomChallenge);
        // this.setState({activeChallenge: randomChallenge});
    }
  


    // componentDidMount(){
    //     this.setState({
    //         category: this.props.category
    //     });
    // }


    render() {
        if (this.props.currentStep !== 2) {
            return null
        }

        return(
            <div>
                <div className="challenge-game-modal__body--prompt">{this.props.category}</div>
            {/* <ChallengeActive
                title={this.state.activeChallenge.title}
                startTime={this.state.activeChallenge.startTime}
                completeChallenge={this.completeChallenge}
                skipChallenge={this.skipChallenge}
            ></ChallengeActive> */}
            <Button
                name={this.props.category}
                onClick= {this.getRandomChallenge}
                variant="primary"
            >
                getRandomChallenge
            </Button>
            </div>
            
        )
    }
}

export default ChallengeGameModalStep2;

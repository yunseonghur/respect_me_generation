import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import challenge from "../images/challenge.gif";
import "./ChallengeGameModalStep1.css";

class ChallengeGameModalStep2 extends Component {

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }

        return(
            <div>
                <div className="challenge-game-modal__body--prompt">Step 2</div>
            <div>
                <img className="challenge-game-modal__body--image" src={challenge} />
             </div>

            </div>
            
        )
    }
}

export default ChallengeGameModalStep2;

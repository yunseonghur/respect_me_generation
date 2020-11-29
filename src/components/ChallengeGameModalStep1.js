import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import challenge from "../images/challenge.gif";
import "./ChallengeGameModalStep1.css";

/**
 * Represent the first page of the challenge game modal.
 *
 * @param {string} category a category selected by a user
 * @param {function} selectCategoryButton a function to set a category of the challenge
 * @param {number} currentStep page number for challenge game modal
 */
class ChallengeGameModalStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      variant: "",
    };
  }

  categories = {
    Study: "outline-primary",
    Health: "outline-success",
    Relationship: "outline-danger",
  };

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <div>
        <div className="challenge-game-modal__body--prompt">Choose a category</div>
        <div>
          <img alt="challenge game" className="challenge-game-modal__body--image" src={challenge} />
        </div>
        <div>{this.state.category}</div>
        <ButtonGroup size="lg" className="challenge-game-modal__body__bth-group">
          <div className="challenge-game-modal__body__btn-group--categories">
            {Object.entries(this.categories).map(([category, color]) => {
              return (
                <Button
                  key={category}
                  variant={color}
                  name={category}
                  value={this.props.category}
                  className="challenge-game-modal__body__bth-group--categories"
                  onClick={this.props.selectCategoryButton}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </ButtonGroup>
      </div>
    );
  }
}

export default ChallengeGameModalStep1;

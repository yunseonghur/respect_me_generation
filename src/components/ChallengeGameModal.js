import React, { Component } from "react";
import { Modal, ButtonGroup, Button } from "react-bootstrap";
import challenge from "../images/challenge.gif";
import "./ChallengeGameModal.css";

/**
 * Component that appears when user clicks on the flag to report a post on the card modal.
 * Called in CreateCard.js
 *
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class ChallengeGameModal extends Component {
  categories = {
    study: "outline-primary",
    health: "outline-secondary",
    relationship: "outline-danger",
  };
  render() {
    return (
      <Modal
        className="challenge-game-modal"
        show={this.props.show}
        animation={false}
        onHide={this.props.onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="challenge-game-modal__header" closeButton>
          <Modal.Title>Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body className="challenge-game-modal__body">
          <div className="challenge-game-modal__body--prompt">Choose a category</div>
          <div>
            <img className="challenge-game-modal__body--image" src={challenge} />
          </div>

          <ButtonGroup size="lg" className="challenge-game-modal__body__bth-group">
            <div className="challenge-game-modal__body__btn-group--categories">
              {Object.entries(this.categories).map(([category, color]) => {
                return (
                  <Button
                    key={category}
                    variant={color}
                    className="challenge-game-modal__body__bth-group--categories"
                  >
                    {category}
                  </Button>
                );
              })}
            </div>
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer className="challenge-game-modal__footer"></Modal.Footer>
      </Modal>
    );
  }
}

export default ChallengeGameModal;

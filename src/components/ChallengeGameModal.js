import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./ChallengeGameModal.css";
import ChallengeGameModalStep1 from "./ChallengeGameModalStep1";
import ChallengeGameModalStep2 from "./ChallengeGameModalStep2";


/**
 * Represent the challenge game modal that appears when user starts challenge.
 * Called in Dashboard.js
 *
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class ChallengeGameModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      category: '',
      challengeModalVisible: false
    }
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    this.selectCategoryButton = this.selectCategoryButton.bind(this);
    this.resetModalStep = this.resetModalStep.bind(this);
  }

  /**
   * Displays this challenge game modal
   */
  showChallengeModal = () => {
    this.setState({ 
      challengeModalVisible: !this.state.challengeModalVisible,
      currentStep: 1 
    });
  };

  /**
   * Hides this challenge game modal
   */
  hideChallengeModal = () => {
    this.setState({ currentStep: 1 });
    this.props.hideChallengeModal();
  };


  /**
   * Resets the modal to let users choose a category
   */
  resetModalStep() {
    this.setState({
      currentStep: 1
    })
  }

  /**
   * Sets a category for a challenge
   * @param {Object} event
   */
  selectCategoryButton(event) {
    const {name} = event.target;
    this.setState({
      category: name
    })
    this._next();
  }

  /**
   * Displays next screen to chooose a challenge
   */
  _next() {
    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  /**
   * Displays previous screent to choose a category
   */
  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  /**
   * Getter method for the previous button
   */
  get previousButton(){
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    // ...else return nothing
    return null;
  }

  render() {
    return (
      <Modal
        className="challenge-game-modal"
        show={this.props.show}
        animation={false}
        onHide={this.hideChallengeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="challenge-game-modal__header" closeButton>
          <Modal.Title>Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body className="challenge-game-modal__body">
          <ChallengeGameModalStep1
            currentStep={this.state.currentStep}
            selectCategoryButton={this.selectCategoryButton}
          ></ChallengeGameModalStep1>

           <ChallengeGameModalStep2
            currentStep={this.state.currentStep}
            resetModalStep={this.resetModalStep}
            category={this.state.category}
            getRandomChallenge={this.props.getRandomChallenge}
            completedChallenges={this.props.completedChallenges}
            activeChallenges={this.props.activeChallenges}
            userUID={this.props.userUID}
            hideChallengeModal={this.props.hideChallengeModal}
            updateActiveChallenges={this.props.updateActiveChallenges}
          ></ChallengeGameModalStep2>
        </Modal.Body>
        <Modal.Footer className="challenge-game-modal__footer"> 
          {this.previousButton}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChallengeGameModal;

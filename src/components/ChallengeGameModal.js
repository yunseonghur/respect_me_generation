import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./ChallengeGameModal.css";
import ChallengeGameModalStep1 from "./ChallengeGameModalStep1";
import ChallengeGameModalStep2 from "./ChallengeGameModalStep2";
import ChallengeGameModalStep3 from "./ChallengeGameModalStep3";


const MAX_PAGE = 3;
/**
 * Component that appears when user clicks on the flag to report a post on the card modal.
 * Called in CreateCard.js
 *
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class ChallengeGameModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      category: ''
    }
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
    this.selectCategoryButton = this.selectCategoryButton.bind(this);
  }

  selectCategoryButton(event) {
    const {name} = event.target;
    this.setState({
      category: name
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {category} = this.state;
    alert(`Category:  ${category}`)
  }

  _next() {
    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  _submit() {
    return null;
  }


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
  
  get nextButton(){
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if(currentStep < MAX_PAGE){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next
        </button>        
      )
    }

    if(currentStep === MAX_PAGE){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._submit}>
        Submit
        </button>        
      )
    }
    // ...else render nothing
    return null;
  } 

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
          <ChallengeGameModalStep1
              currentStep={this.state.currentStep}
              selectCategoryButton={this.selectCategoryButton}
          ></ChallengeGameModalStep1>

           <ChallengeGameModalStep2
              currentStep={this.state.currentStep}
              category={this.state.category}
              getRandomChallenge={this.props.getRandomChallenge}
              completedChallenges={this.props.completedChallenges}
          ></ChallengeGameModalStep2>

           <ChallengeGameModalStep3
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
          ></ChallengeGameModalStep3>
        </Modal.Body>
        <Modal.Footer className="challenge-game-modal__footer"> 
          {this.previousButton}
          {this.nextButton}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChallengeGameModal;

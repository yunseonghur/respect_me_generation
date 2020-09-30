import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

/**
 * Displayed when text is too long.
 * Called in CreateCard.js and AddComment.js
 * 
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class TextLengthModal extends Component {

  render(){
    return (
      <Modal 
      className="text-length-modal" // tlm
      aria-labelledby="contained-modal-title-vcenter" 
      show={this.props.show} 
      onHide={this.props.onHide} 
      animation={false} 
      size="sm" 
      centered>
        <Modal.Header className="tlm__header" closeButton>
          <Modal.Title className="tlm__header--title">Text is too long</Modal.Title>
        </Modal.Header>
        <Modal.Body className='tlm__body'>
          <div className='tlm__body--warning-text'>
            Text has to be less than {this.props.textLength} characters.
          </div>
        </Modal.Body>
      </Modal>
    )
  }
};

export default TextLengthModal;
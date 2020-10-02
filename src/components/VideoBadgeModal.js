import React from 'react';
import "./VideoBadgeModal.css";
import advBadge from '../images/adv_badge.png';
import {Modal, Container} from 'react-bootstrap';

/**
 * Dislayed when user has 'basic' badge and attempts
 * to upload a video.
 * Called in CommunityBoard.js
 * 
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class VideoBadgeModal extends React.Component {

  render() {
    return (
      <Modal
      className="vbm"
      aria-labelledby="contained-modal-title-vcenter" 
      animation={false}
      show={this.props.show}
      onHide={this.props.onHide}
      size="md" 
      centered>
        <Modal.Header className="vbm__header" closeButton>
          <Modal.Title className="vbm__header--title">Action not permitted.</Modal.Title>
        </Modal.Header>
        <Modal.Body className="vbm__body">
          <Container>
            <img className="vbm__body--badge-img" src={advBadge} alt='advanced badge'/>
            <h4>Only users with an 'advanced' badge may post.</h4>
            <h4>Post more to level up!</h4>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

export default VideoBadgeModal;
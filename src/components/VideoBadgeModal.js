import React from 'react';
import advBadge from '../images/adv_badge.png';
import {Modal, Container} from 'react-bootstrap';

/**
 * Dislayed when user has 'basic' badge and attempts
 * to upload a video.
 * Called in CommunityBoard.js, 
 */
class VideoBadgeModal extends React.Component {

    render() {
        return (
            <Modal
            show={this.props.show}
            animation={false}
            onHide={this.props.onHide}
            size="md" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Action not permitted.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <img className='img' src={advBadge} alt='advanced badge'/>
                        <h4>Only users with an 'advanced' badge may post.</h4>
                        <h4>Post more to level up!</h4>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default VideoBadgeModal;
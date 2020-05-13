import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import fire from '../fire';
import './ReportModal.css';

class ReportModal extends React.Component {

    db = fire.database();
    
    // add card ownerUID and card id to firebase and the date reported
    report =()=> {
        var date = Date.now();
        date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', 
                day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(date);
        this.db.ref("Reports/" + this.props.cardOwnerUID).child('cards/' + this.props.cardID).update({
            date: date
        })
        this.props.onHide();
    }

    render() {
        return (
            <Modal
            show={this.props.show}
            animation={false}
            onHide={this.props.onHide}
            size="sm" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered>
                <Modal.Header closeButton>
                    <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Is this card inappropriate?
                </Modal.Body>
                <Modal.Footer id="footer">
                    <Button variant="danger" className="modal-btn" onClick={this.report}>Report</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ReportModal;
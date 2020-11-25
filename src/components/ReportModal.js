import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import fire from "../fire";
import "./WarningModals.css";

/**
 * Component that appears when user clicks on the flag to report a post on the card modal.
 * Called in CreateCard.js
 *
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class ReportModal extends Component {
  db = fire.database();

  /**
   * add card ownerUID and card id to firebase and the date reported
   */
  report = () => {
    var date = Date.now();
    date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
    this.db
      .ref("Reports/" + this.props.cardOwnerUID)
      .child("cards/" + this.props.cardID)
      .update({
        date: date,
      });
    this.props.onHide();
  };

  render() {
    return (
      <Modal
        className="report-modal"
        show={this.props.show}
        animation={false}
        onHide={this.props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="report-modal__header" closeButton>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body className="report-modal__body warning-modal__body">
          Is this card inappropriate?
        </Modal.Body>
        <Modal.Footer className="report-modal__footer">
          <Button className="report-modal__footer--button" variant="danger" onClick={this.report}>
            Report
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ReportModal;

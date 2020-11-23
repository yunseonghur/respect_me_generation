import React from "react";
import { Modal, Button } from "react-bootstrap";
import fire from "../fire";
import "./WarningModals.css";

/**
 * Displayed when user clicks Log Out button.
 * Called in Navigation.js
 *
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class LogoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    fire
      .auth()
      .signOut()
      .then(function () {
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log("Sign out ERROR");
      });
  }

  render() {
    return (
      <Modal
        className="logout-modal"
        show={this.props.show}
        onHide={this.props.onHide}
        animation={false}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="logout-modal__header" closeButton>
          <Modal.Title className="logout-modal__header--title">Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body className="logout-modal__body warning-modal__body">
          Are you sure you want to log out?
        </Modal.Body>
        <Modal.Footer className="logout-modal__footer">
          <Button className="logout-modal__footer--button" onClick={this.logOut}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LogoutModal;

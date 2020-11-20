import React, { Component } from "react";
import "./FloatingButton.css";
import { withRouter } from "react-router-dom";
import { Container, Button } from "react-floating-action-button";
import fire from "../fire.js";
import VideoBadgeModal from "./VideoBadgeModal";
import LoginModal from "./LoginModal";
import plus from "../images/icon-plus.png";
import video from "../images/icon-video.png";
import note from "../images/icon-note.png";
import CreateCardModal from "./CreateCardModal";

const db = fire.database();

class FloatingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      videos: [],
      isLoading: true, // true if the server is still loading cards data
      visible: true, // true if cards are visible & false if videos are visible
      show: false,
      userUID: null, // the current user
      badge: "",
      points: "",
      displayErrorMessage: false, // if user does not have 'advanced' badge, cannot post video
      displayLoginModal: false, // if user isn't logged in, cannot create cards
      displayCreateCardModal: false, // display create card modal
    };
    this.getCurrentUser();
  }
  /**
   * Gets the current users badge level and points,
   * because they need to be checked later for allowing functionalities.
   */
  getBadgePoints = () => {
    db.ref()
      .child("User")
      .on("value", (snap) => {
        const snapshot = snap.val();
        this.setState({
          badge: snapshot[this.state.userUID]["badge"],
          points: snapshot[this.state.userUID]["points"],
        });
      });
  };

  getCurrentUser() {
    // get references that DON'T change
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userUID: user.uid,
        });
        this.getBadgePoints();
      }
    });
  }

  displayCreateCardModal = () => {
    if (this.state.userUID != null) {
      this.setState({ displayCreateCardModal: true });
    } else {
      this.setState({
        displayLoginModal: true,
      });
    }
  };

  /**
   * Uploads a video via the Cloudinary widget.
   * All uploads are currently tagged as project, so that
   * all videos uploaded public_id can be retrieved via get in VideoDisplay.
   */
  uploadHandler = () => {
    // requires the Cloudinary import on index.html
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "respectmegen",
        tags: ["project"],
        uploadPreset: "h5awwspl",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the video info: ", result.info);
          console.log("public_id: " + result.info.public_id);
          console.log("userUID in createWidget: " + this.state.userUID);

          if (this.state.userUID != null) {
            // store the id into the current user:
            var key = db.ref().child("videos").push().key;
            var updates = {};
            updates["/videos/" + key] = result.info.public_id;
            db.ref("User/" + this.state.userUID).update(updates);
            console.log("video " + result.info.public_id + "added to user " + this.state.userUID);
            this.increasePoints(this.state.userUID);
          } else if (this.state.userUID == null) {
            console.log("Videos can only be uploaded by members.");
          }
        }
      }
    );

    // only users with 100+ points ("advanced badge") can upload videos
    console.log("current badge: " + this.state.badge + "\ncurrent points: " + this.state.points);
    if (this.state.userUID != null && this.state.badge === "advanced") {
      myWidget.open();
    } else if (this.state.userUID != null && this.state.badge === "basic") {
      this.setState({
        displayErrorMessage: true,
      });
    } else if (this.state.userUID === null) {
      this.setState({
        displayLoginModal: true,
      });
    }
  };

  /**
   * Gives points to user for creating a card post.
   * @param {firebaseUser} currentUser
   */
  increasePoints(currentUser) {
    console.log("increase points");
    db.ref("User/" + currentUser)
      .once("value")
      .then(function (snapshot) {
        let points = snapshot.child("points").val();
        points += 20;
        console.log(points);
        fire
          .database()
          .ref("User/" + currentUser)
          .update({
            points,
          });
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Button tooltip="Upload a video" onClick={this.uploadHandler} disabled>
            <img src={video} alt="Upload a video" />
          </Button>
          <Button tooltip="Add a card" onClick={this.displayCreateCardModal} disabled>
            <img src={note} alt="Add a card" />
          </Button>
          <Button
            rotate={true}
            styles={{ backgroundColor: "#2AFFA9", width: "43px", height: "43px" }}
          >
            <img src={plus} alt="Add" />
          </Button>
        </Container>
        <CreateCardModal
          show={this.state.displayCreateCardModal}
          onHide={() => this.setState({ displayCreateCardModal: false })}
        />
        <VideoBadgeModal
          show={this.state.displayErrorMessage}
          onHide={() => this.setState({ displayErrorMessage: false })}
        />
        <LoginModal
          show={this.state.displayLoginModal}
          onHide={() => this.setState({ displayLoginModal: false })}
        />
      </div>
    );
  }
}

export default withRouter(FloatingButton);

import React from "react";
import fire from "../fire";
import "../routes/CreateCard.css";
import { ButtonGroup, Card, Button, Modal, CardColumns } from "react-bootstrap";
import TextLengthModal from "../components/TextLengthModal";
import CardModal from "../components/CardModal";
import "./CreateCardModal.css";
/**
 * Dislayed when user has 'basic' badge and attempts
 * to upload a video.
 * Called in CommunityBoard.js
 *
 * @param {boolean} show indicating whether modal is open showing
 * @param {function} onHide what to do when closing modal
 */
class CreateCardModal extends React.Component {
  tags = ["study", "health", "relationship"];
  constructor(props) {
    super(props);
    this.state = {
      imgOption: "1",
      text: "",
      createdCard: false,
      imgSrc: "",
      tag: "all",
      cardKey: "",
      textLengthModal: false,
      timestamp: "",
    };
    this.db = fire.database();
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleTxtChange = this.handleTxtChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // imgOption state is set when an image is selected
  handleImgChange(event) {
    this.setState({
      imgOption: event.target.value,
    });
  }

  // text state is set when user enters a text
  handleTxtChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleTagChange(event) {
    this.setState({
      tag: event.target.name,
    });
  }

  // saves card information to firebase
  writeCardInfo(imgSrc, currentUser) {
    if (this.state.text.length <= 75) {
      var key = this.db.ref().child("Card").push().key;
      var timestamp = Date.now();
      this.setState({ timestamp: timestamp });

      this.db
        .ref("User/" + currentUser.uid)
        .child("cards/" + key)
        .set({
          imgOption: imgSrc,
          text: this.state.text,
          tag: this.state.tag,
          timestamp: timestamp,
        });
      this.setState({
        cardKey: key,
        createdCard: true,
      });
    } else {
      this.setState({ textLengthModal: true });
    }
  }

  // finds src of the image selected by user
  handleSubmit(event) {
    event.preventDefault();
    var currentUser = fire.auth().currentUser;

    if (currentUser != null) {
      var imgRef = this.db.ref("Image");
      var imgSource = "";
      imgRef.on("value", (snap) => {
        const imgInfo = snap.val();
        imgSource = imgInfo[this.state.imgOption];
        this.setState({ imgSrc: imgInfo[this.state.imgOption] });
        this.writeCardInfo(imgSource, currentUser);
        this.increasePoints(currentUser);
      });
    }
  }

  /**
   * Gives welcome points to user.
   * @param {firebaseUser} currentUser
   */
  increasePoints(currentUser) {
    this.db
      .ref("User/" + currentUser.uid)
      .once("value")
      .then(function (snapshot) {
        let points = snapshot.child("points").val();
        points += 10;
        console.log(points);
        fire
          .database()
          .ref("User/" + currentUser.uid)
          .update({
            points,
          });
      });
    this.checkBadge(currentUser);
  }

  /**
   * Check user's points to determine if the badge needs to be upgraded.
   * @param {firebaseUser} currentUser
   */
  checkBadge(currentUser) {
    this.db
      .ref("User/" + currentUser.uid)
      .once("value")
      .then(function (snapshot) {
        let points = snapshot.child("points").val();
        let badge = snapshot.child("badge").val();
        console.log(points);
        console.log(badge);
        if (points >= 100) {
          fire
            .database()
            .ref("User/" + currentUser.uid)
            .update({
              badge: "advanced",
            });
        }
      });
  }
  render() {
    return (
      <div>
        {this.state.createdCard ? (
          <CardModal
            id={this.cardKey}
            imgsrc={this.state.imgSrc}
            text={this.state.text}
            tag={this.state.tag}
            animation={false}
            show={this.state.createdCard}
            timestamp={this.state.timestamp}
            onHide={() => this.setState({ createdCard: false })}
          />
        ) : (
          <Modal
            className="create-card-modal"
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            show={this.props.show}
            onHide={this.props.onHide}
            size="md"
            centered
          >
            <Modal.Header className="create-card-modal__header" closeButton></Modal.Header>
            <Modal.Body className="create-card-modal__body">
              <div className="create-card-modal__body__wrapper">
                <form onSubmit={this.handleSubmit}>
                  <div className="create-card-modal__body__wrapper__tags">
                    <p className="create-card-modal__body__wrapper--title">
                      Step 1: Select a Category (Tag)
                    </p>
                    <div className="create-card-modal__body__wrapper__tags--buttons">
                      <ButtonGroup>
                        {this.tags.map((value, index) => (
                          <Button
                            name={value}
                            key={index}
                            onClick={this.handleTagChange}
                            variant="outline-primary"
                            className="rounded-pill community-board__toggle-buttons--btn"
                          >
                            {value}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </div>
                  </div>
                  <div className="create-card-modal__body__wrapper__img">
                    <p className="create-card-modal__body__wrapper--title">
                      Step 2: Select a Background
                    </p>
                    <CardColumns className="create-card-modal__body__wrapper__card-columns">
                      <div className="create-card-modal__body__wrapper__img__opt">
                        <label>
                          <Card className="create-card-modal__body__wrapper__img__opt__card">
                            <Card.Img
                              className="create-card-modal__body__wrapper__img__opt__card-img"
                              src={
                                "https://i.pinimg.com/564x/aa/b8/49/aab84958979e408935c1b472deacda43.jpg"
                              }
                            />
                          </Card>
                          <input
                            type="radio"
                            value="1"
                            checked={this.state.imgOption === "1"}
                            onChange={this.handleImgChange}
                          />
                        </label>
                      </div>
                      <div className="create-card-modal__body__wrapper__img__opt">
                        <label>
                          <Card className="create-card-modal__body__wrapper__img__opt__card">
                            <Card.Img
                              className="create-card-modal__body__wrapper__img__opt__card-img"
                              src={
                                "https://i.pinimg.com/564x/73/96/bd/7396bd1cbf9e8ef8c73be0476290fd95.jpg"
                              }
                            />
                          </Card>
                          <input
                            type="radio"
                            value="2"
                            checked={this.state.imgOption === "2"}
                            onChange={this.handleImgChange}
                          />
                        </label>
                      </div>
                      <div className="create-card-modal__body__wrapper__img__opt">
                        <label>
                          <Card className="create-card-modal__body__wrapper__img__opt__card">
                            <Card.Img
                              className="create-card-modal__body__wrapper__img__opt__card-img"
                              src={
                                "https://i.pinimg.com/564x/40/39/5c/40395c9d7cd4263ce1eb1d9eae47b920.jpg"
                              }
                            />
                          </Card>
                          <input
                            type="radio"
                            value="3"
                            checked={this.state.imgOption === "3"}
                            onChange={this.handleImgChange}
                          />
                        </label>
                      </div>
                    </CardColumns>
                  </div>
                  <div className="create-card-modal__body__wrapper__text">
                    <p className="create-card-modal__body__wrapper--title">
                      Step 3: Enter Your Message
                    </p>
                    <textarea
                      name="text"
                      className="create-card-modal__body__wrapper__text--text-area"
                      onChange={this.handleTxtChange}
                    />
                  </div>
                  <div className="create-card-modal__body__wrapper__submit">
                    <button
                      className="create-card-modal__body__wrapper__submit--button"
                      onClick={this.handleSubmit}
                      size="lg"
                    >
                      Post it!
                    </button>
                  </div>
                </form>

                <TextLengthModal
                  animation={false}
                  show={this.state.textLengthModal}
                  onHide={() => this.setState({ textLengthModal: false })}
                  textLength={75}
                />
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

export default CreateCardModal;

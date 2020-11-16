import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "./MyCard.css";
import CommentsIcon from "../images/CommentsIcon.js";
import AddComment from "./AddComment";

/**
 * Represents a single card object.
 * Called in CardModal.js, Cards.js, AddComment.js, Profile.js
 *
 * @param {function} onClick should show the AddComment modal
 * @param {string} background
 * @param {int} commentCount
 */
class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  openAddComment = () => {
    this.setState({ visible: !this.state.visible });
  };

  timestamp = new Date(this.props.timestamp);
  date = this.timestamp.getDate();
  month = this.timestamp.getMonth();
  year = this.timestamp.getFullYear();
  hour = this.timestamp.getHours();
  minute = "0" + this.timestamp.getMinutes();
  formattedDate =
    this.year +
    "/" +
    this.month +
    "/" +
    this.date +
    " at " +
    this.hour +
    ":" +
    this.minute.substr(-2);

  render() {
    return (
      <div className="mycard">
        <Card className="mycard__card" onClick={this.openAddComment}>
          <Card.Img className="mycard__card--img" src={this.props.background} alt="Card image" />
          <Card.ImgOverlay className="mycard__card__overlay">
            <Card.Text className="mycard__card__overlay__text-header">
              <span className="mycard__card__overlay__text-header--tag">{this.props.tag}</span>
              <span className="mycard__card__overlay__text-header--timestamp">
                {this.formattedDate}
              </span>
            </Card.Text>
            <Card.Text className="mycard__card__overlay--text">{this.props.text}</Card.Text>
            <Card.Text className="mycard__card__overlay__text-bottom">
              <span>
                <CommentsIcon className="mycard__card__overlay__text-bottom--comment" />
              </span>
              <span className="mycard__card__overlay__text-bottom--comment-count mycard__card__overlay__text=bottom--icon-item">
                {this.props.commentCount}
              </span>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
        {this.state.visible && this.props.clickable ? (
          <AddComment
            show={this.state.visible}
            cardOwnerUID={this.props.cardOwnerUID}
            cardID={this.props.id}
            tag={this.props.tag}
            timestamp={this.props.timestamp}
            onHide={this.openAddComment}
          />
        ) : null}
      </div>
    );
  }
}

MyCard.propTypes = {
  id: PropTypes.string,
  background: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MyCard;

import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "./MyCard.css";
import { faComments, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Represents a single card object.
 * Called in CardModal.js, Cards.js, AddComment.js, Profile.js
 *
 * @param {function} onClick should show the AddComment modal
 * @param {string} background
 * @param {int} commentCount
 * @param {int} upvoteCount
 */
class MyCard extends Component {
  render() {
    return (
      <div className="mycard">
        <Card className="mycard__card" onClick={this.props.onClick}>
          <Card.Img className="mycard__card--img" src={this.props.background} alt="Card image" />
          <Card.ImgOverlay className="mycard__card__overlay">
            <Card.Text className="mycard__card__overlay--text">{this.props.text}</Card.Text>
            <Card.Text className="mycard__card__overlay__text-bottom">
              <FontAwesomeIcon
                icon={faComments}
                className="mycard__card__overlay__text-bottom--comment"
              />
              <span className="mycard__card__overlay__text-bottom--comment-count mycard__card__overlay__text=bottom--icon-item">
                {this.props.commentCount}
              </span>
              <FontAwesomeIcon
                className="mycard__card__overlay__text-bottom--upvote"
                icon={faThumbsUp}
              />
              <span className="mycard__card__overlay__text-bottom--upvote-count mycard__card__overlay__text-bottom--icon-item">
                {this.props.upvoteCount}
              </span>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
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

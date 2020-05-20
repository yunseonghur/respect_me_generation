import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './MyCard.css';
import { faComments, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


/**
 * Represents a single card object.
 * Called in CardModal.js, Cards.js, AddComment.js, Profile.js
 * 
 * @param {function} onClick should show the AddComment modal
 * @param {string} background
 * @param {int} commentCount
 * @param {int} upvoteCount
 * @param {int} downvoteCount
 */
class MyCard extends Component {

    render() {
        return (
            <div className="cardWrapper">
                <Card onClick={this.props.onClick}>
                    <Card.Img className="card__img" src={this.props.background} alt="Card image" />
                    <Card.ImgOverlay className="overlay">
                        <Card.Text className="text-center">{this.props.text}</Card.Text>
                        <Card.Text className="text-bottom-left">
                            <FontAwesomeIcon icon={faComments} />
                            <span className="commentCount iconItem">{this.props.commentCount}</span>
                            <FontAwesomeIcon className="thumbs-up" icon={faThumbsUp} />
                            <span className="upvoteCount iconItem">{this.props.upvoteCount}</span>
                            <FontAwesomeIcon className="thumbs-down" icon={faThumbsDown} />
                            <span className="downvoteCount iconItem">{this.props.downvoteCount}</span>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </div>
        )

    }
}

MyCard.propTypes = {
    id: PropTypes.string,
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default MyCard;
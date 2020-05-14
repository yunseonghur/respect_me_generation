import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './MyCard.css';
import { faComments, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


/**
 * Represents a single card object.
 */
class MyCard extends Component {


    render() {
        return (
            <div>
                <a style={{ cursor: "pointer" }} onClick={this.props.onClick}>
                <Card>
                    <Card.Img className="card__img" src={this.props.background} alt="Card image" />
                    <Card.ImgOverlay className="overlay">
                        <Card.Text className="text-center">{this.props.text}</Card.Text>
                        <Card.Text className="text-bottom-left">
                            <div className="commentCount">
                                <FontAwesomeIcon className="bubble" icon={faComments} />
                                <span>{this.props.commentCount}</span>
                            </div>
                            <div className="upvoteCount">
                                <FontAwesomeIcon className="thumbs-up" icon={faThumbsUp} />
                                <span>{this.props.upvoteCount}</span>
                            </div>
                            <div className="downvoteCount">
                                <FontAwesomeIcon className="thumbs-down" icon={faThumbsDown} />
                                <span>{this.props.downvoteCount}</span>
                            </div>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
                </a>
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
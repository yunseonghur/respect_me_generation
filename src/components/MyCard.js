import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './MyCard.css';
import { faComments, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Represents a single card object.
 */
class MyCard extends Component {

    render () {
        return (
            <div>
                <a style={{ cursor: "pointer" }} onClick={this.props.onClick}>
                <Card>
                    <Card.Img className="card__img" src={this.props.background} alt="Card image" />
                    <Card.ImgOverlay className="overlay">
                        <Card.Text className="text-center">{this.props.text}</Card.Text>
                        <Card.Text className="text-bottom-left">
                            <FontAwesomeIcon icon={faComments} />
                            <p className="commentCount">16</p>
                            <FontAwesomeIcon className="heart" icon={faHeart} />
                            <FontAwesomeIcon className="lightbulb" icon={faLightbulb} />
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
                </a>
            </div>
        )

    }
}

MyCard.propTypes = {
    id: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default MyCard;
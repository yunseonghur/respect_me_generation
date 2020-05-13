import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './MyCard.css';
import { faComments } from "@fortawesome/free-solid-svg-icons";
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
                    <Card.ImgOverlay>
                        <Card.Text className="text-center">{this.props.text}</Card.Text>
                        <Card.Text className="text-bottom"><FontAwesomeIcon icon={faComments} /></Card.Text>
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
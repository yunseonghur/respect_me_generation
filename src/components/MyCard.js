import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function MyCard({id, background, text}){
    return (
        <div className="card">
            <Card>
                <Card.Img className="card__img" src={background} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Text>{text}</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>
    );
}

MyCard.propTypes = {
    id: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default MyCard;
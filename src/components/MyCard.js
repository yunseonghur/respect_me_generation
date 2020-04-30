import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';

function MyCard({id, background, text}){
    var image;
    if (background == "img1") {
        image = img1;
    } else if(background == "img2") {
        image = img2;
    } else {
        image = img3;
    }
    return (
        <div className="card">
            <Card>
                <Card.Img className="card__img" src={image} alt="Card image" />
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
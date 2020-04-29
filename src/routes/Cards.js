import React, {Component} from 'react';
import MyCard from '../components/MyCard';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import "./Cards.css";

class Cards extends React.Component{

    render() {
        return (
            <div className="deck">
                <Card style={{width: '18rem'}}>
                <Button variant="primary">
                    <Card.Img variant="top" src="https://i.pinimg.com/564x/83/f0/3a/83f03ac706568420b12b98ed22016650.jpg" />
                </Button>
                <Card.Body>
                    <Card.Title>Owner</Card.Title>
                </Card.Body>
                </Card>
                {/* <MyCard id="1" background="https://via.placeholder.com/120px100" text="You yourself, as much as anybody in the entire universe, deserve your love and affection" />
                <MyCard id="2" background="https://via.placeholder.com/120px100" text="Life is just about choices." /> */}
            
            </div>
        )
    }
}

{/* <Card style={{width: '18rem'}}>
            <Button variant="primary">
                <Card.Img variant="top" src="https://i.pinimg.com/564x/83/f0/3a/83f03ac706568420b12b98ed22016650.jpg" />
            </Button>
            <Card.Body>
                <Card.Title>Owner</Card.Title>
            </Card.Body>
            </Card> */}

export default Cards;
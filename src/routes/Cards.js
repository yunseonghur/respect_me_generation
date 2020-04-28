import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import "./Cards.css";

class Card extends React.Component{
    render() {
        return (
            <Card style={{width: '18rem'}}>
            <Button variant="primary">
                <Card.Img variant="top" src="https://i.pinimg.com/564x/83/f0/3a/83f03ac706568420b12b98ed22016650.jpg" />
            </Button>
            <Card.Body>
                <Card.Title>Owner</Card.Title>
            </Card.Body>
        </Card>
        )
    }
}

function Cards(){
    return (
        <div>
            <ExampleCard></ExampleCard>
        </div>
    );
}



export default Cards;
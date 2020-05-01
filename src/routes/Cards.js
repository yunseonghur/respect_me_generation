import React, {Component} from 'react';
import MyCard from '../components/MyCard';
import {Modal, CardDeck, Button, Row, Col, Form, Jumbotron, Container} from 'react-bootstrap';
import AddComment from '../components/AddComment';
// import "./Cards.css";

class Cards extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            cards: [
                {id:"1", background:"https://via.placeholder.com/120px100", text:"You yourself, as much as anybody in the entire universe, deserve your love"},
                {id:"2", background:"https://via.placeholder.com/120px100", text:"Testing Testing"},
                {id:"3", background:"https://via.placeholder.com/120px100", text:"Blah blah"}
            ]
        }
    }

    cardClicked = () => {
        this.setState({visible: true})
      };
    
    hideModal = () => {
        this.setState({visible: false})
    }

    render() {

        return (
            <div>
                <h2 className="logo-text"><b>Respect Me<br/>Generation</b></h2>

                <Jumbotron>
                    <h1>How are you feeling today?</h1>
                    <Button>Add Card</Button>
                </Jumbotron>
                <Container>
                    <CardDeck>
                        {this.state.cards.map((card) => {
                            return (
                                <MyCard onClick={this.cardClicked} background={card.background} text={card.text} id={card.id} key={card.id}/>
                            )
                        })
                        }

                        {this.state.visible ?
                        <AddComment hideModal={this.hideModal} />
                        : null}
                    </CardDeck>
                </Container>
            </div>
        )
    }
}

{/* <Card style={{width: '18rem'}}>
                        <Button variant="primary" onClick={()=> this.setState({visible:true})}>
                            <Card.Img variant="top" src="https://via.placeholder.com/120px100" />
                        </Button>
                        {this.state.visible ?
                        <AddComment />
                        : null}
                    </Card> */}

export default Cards;
import React from 'react';
import "./Home.css";
import fire from '../fire.js';
import MyCard from '../components/MyCard';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import Jumbotron from 'react-bootstrap/Jumbotron'

class Home extends React.Component{
    state = { 
        message: "",
        cards: [],
        resources: [],
    };
    componentDidMount(){
        var year = new Date().getFullYear();
        var month = new Date().getMonth(); // Jan:0 ~ Dec:11
        var date = new Date().getDate();
        this.database = fire.database().ref().child('Messages').orderByKey();
        this.database.on('value', snap => {
            const messages = snap.val();
            this.setState({
                message: messages[year][month][date]
            });
        });
    }
    render(){
        return (
            <div>
                <h2 className="logo-text"><b>Respect Me<br/>Generation</b></h2>
                <Carousel interval="8000">
                    <Carousel.Item>
                        <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the first slide" />
                        <Carousel.Caption className="caption">
                            <p>Today's message</p>
                            <h3>"{this.state.message}"</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the second slide" />
                        <Carousel.Caption className="caption">
                            <h3>Introducing Respect Me Generation</h3>
                            <p>A community for teenagers.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="card-section">
                    <h3>Cards</h3>
                    <CardDeck>
                        {Array.from(this.state.cards).map((myCard)=> 
                            <MyCard 
                                key={myCard.id} 
                                id={myCard.id} 
                                background={myCard.background} 
                                text={myCard.text} 
                            />)}
                    </CardDeck>
                </div>

                <div className="resource-section">
                    <h3>Resources</h3>
                    <Jumbotron fluid>
                        <p></p>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}


// function Home(){
//     return (

//     );
// }



export default Home;
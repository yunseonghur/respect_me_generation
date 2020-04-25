import React from 'react';
import "./Home.css";
import Carousel from 'react-bootstrap/Carousel'
import fire from '../fire.js';

class Home extends React.Component{
    state = { 
        message: "",
        topThreeCards: [],
        topResources: [],
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
            <Carousel>
                <Carousel.Item>
                    <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the first slide" />
                    <Carousel.Caption>
                        <p>Today's message</p>
                        <h3>"{this.state.message}"</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the second slide" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="slide-img" src="https://via.placeholder.com/1200x400" alt="This is the third slide" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
        </Carousel>
        </div>
        );
    }
}


// function Home(){
//     return (

//     );
// }



export default Home;
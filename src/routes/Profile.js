import React from 'react';
import "./Profile.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyCard from '../components/MyCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import fire from '../fire.js';


class Profile extends React.Component{
    state = {
        userUID: "",
        username: "",
        badge: "",
        points: "",
        cards: [],
        videos: []
    };
    componentDidMount(){
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username: user.displayName,
                    userUID: user.uid
                });
            } else {
                console.log("no current user");
            }
        })
        this.database = fire.database().ref().child('User').orderByKey();
        this.database.on('value', snap => {
            const userInfo = snap.val();
            this.setState({
                badge: userInfo[this.state.userUID]['badge'],
                points: userInfo[this.state.userUID]['points']
            });
        });
    }
    render(){
        return (
            <div>
                <Jumbotron>
                    <p>Hi {this.state.username}!</p>
                    <span>badge: {this.state.badge}, </span>
                    <span>points: {this.state.points}</span>
                </Jumbotron>

                <Container>
                    <Row>
                        <Col>
                            <h3>Your Cards</h3>
                            <MyCard id="1" background="https://via.placeholder.com/120px100" text="You yourself, as much as anybody in the entire universe, deserve your love and affection" />
                        </Col>
                        <Col>
                            <h3>Your Videos</h3>
                            <MyCard id="2" background="https://via.placeholder.com/120px100" text="place holder for videos" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default Profile;
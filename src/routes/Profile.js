import React from 'react';
import "./Profile.css";
import Jumbotron from 'react-bootstrap/Jumbotron';
import MyCard from '../components/MyCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Profile extends React.Component{
    state = {
        username: "Yuni" // need to read it from firebase
    };
    render(){
        return (
            <div>
                <h2 className="logo-text"><b>Respect Me<br/>Generation</b></h2>
                <Jumbotron>
                    <p>Hi {this.state.username}!</p>
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
import React, { Component } from 'react';
import fire from '../fire';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../components/Navigation.css';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this.db = fire.database();
        this.authListener = this.authListener.bind(this);
        this.writeUserData = this.writeUserData.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    writeUserData(userId, name, email) {
        this.db.ref('User/' + userId).update({
            name: name,
            email: email
        })
    }

    addUserData(userId){
        this.db.ref('User/'+userId).once('value')
        .then(function(snapshot){
            // if points not exist, set default points and badge
            if(!(snapshot.child('points').exists())){
                fire.database().ref('User/' + userId).update({
                    points: 10,
                    badge: 'basic'
                })
            }
        });
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                this.writeUserData(user.uid, user.displayName, user.email);
                this.addUserData(user.uid);

            } else {
                this.setState({ user: null });
            }

        })
    }

    render() {
        return( 
            <div>
                <Navbar bg="light" expand="md">
                    <Navbar.Brand href="/" id="brand">Respect Me<br/>Generation</Navbar.Brand>
                    <Navbar.Toggle id="navBtb" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            { this.state.user ? <Nav.Link href="#profile"><img src="https://img.icons8.com/material-outlined/24/000000/person-male.png" alt="Profile"/></Nav.Link> : null}
                            <Nav.Link href="#communityBoard"><img src="https://img.icons8.com/material-outlined/24/000000/megaphone.png" alt="Community Board"/></Nav.Link>
                            <Nav.Link href="#resources"><img src="https://img.icons8.com/material-outlined/24/000000/diversity.png" alt="Resources"/></Nav.Link>
                            { this.state.user ? <Nav.Link href="#logout">Log Out</Nav.Link> : <Nav.Link href='#login'>Log In</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation;
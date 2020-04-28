import React, { Component } from 'react';
import fire from '../fire';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../components/Navigation.css';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // logInState: "Login"
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
        this.db.ref('User/' + userId).set({
            name: name,
            email: email
        })
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
                this.writeUserData(user.uid, user.displayName, user.email);
            } else {
                this.setState({ user: null });
            }
        })
    }

    render() {
        return( 
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Respect Me Generation</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#cards">Cards</Nav.Link>
                            <Nav.Link href="#videos">Videos</Nav.Link>
                            <Nav.Link href="#resources">Resources</Nav.Link>
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            { this.state.user ? <Nav.Link href="#logout">Log Out</Nav.Link>: <Nav.Link href='#login'>Log In</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                
            </div>
        )
    }
}

export default Navigation;
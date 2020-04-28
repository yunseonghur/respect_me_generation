import React, { Component } from 'react';
import { Link } from "react-router-dom";
import fire from '../fire';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


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
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Link to="/">Home</Link>
                <Link to="/cards">Cards</Link>
                <Link to="/videos">Videos</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/profile">Profile</Link>
                { this.state.user ? <Link to="/logout">Log Out</Link>: <Link to='/login'>Log In</Link>}
            </div>
        )
    }
}

export default Navigation;
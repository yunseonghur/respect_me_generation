import React, { Component } from 'react';
import { Link } from "react-router-dom";
import fire from '../fire';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // logInState: "Login"
            user: {}
        };
        // this.setLogIn = this.setLogIn.bind(this);
        this.authListener = this.authListener.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        })
    }
    render() {
        return(
            <div>
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
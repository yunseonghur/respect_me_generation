import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/cards">Cards</Link>
                <Link to="/videos">Videos</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}
// function Navigation(){
//     return (
//     <div>
//         <Link to="/">Home</Link>
//         <Link to="/cards">Cards</Link>
//         <Link to="/videos">Videos</Link>
//         <Link to="/resources">Resources</Link>
//         <Link to="/profile">Profile</Link>
//         <Link to="/login">Login</Link>
//     </div>
//     );
// }

export default Navigation;
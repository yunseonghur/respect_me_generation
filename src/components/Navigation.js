import React from 'react';
import { Link } from "react-router-dom";

function Navigation(){
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/cards">Cards</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
    </div>
    );
}

export default Navigation;
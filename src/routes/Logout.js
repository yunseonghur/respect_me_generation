import React, { Component } from 'react';
import fire from '../fire';
import Home from './Home';

class Logout extends Component {
    logOut = () => {
        fire.auth().signOut().then(function() {
            console.log("Successfully Signed out");

        }).catch(function(error) {
            console.log("Sign out ERROR");
        })
        
    }
    render() {
        return(
            <div>
                <button onClick={this.logOut}>Click Here to Log Out</button> 
            </div>
        )
    }
}

export default Logout;
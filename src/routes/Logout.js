import React, { Component } from 'react';
import firebase from 'firebase';

class Logout extends Component {
    logOut = () => {
        firebase.auth().signOut().then(function() {
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
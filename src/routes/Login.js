import React, { Component } from 'react';
// import fireui from '../fireui';
import firebase from 'firebase';
import fire from '../fire'
import * as firebaseui from 'firebaseui'
import Home from '../routes/Home';

// import "./Login.css";

const ui = new firebaseui.auth.AuthUI(fire.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // navigation.setState({ loggedIn: true });
        
        return true;
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: { Home },
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };

const fireui= function (elementId) {
    ui.start(elementId, uiConfig)
}

class Login extends Component {
    componentDidMount(){
        fireui('#firebaseui-auth-container')
    }

    render() {
        return (
            <div className="login">
                <div id='firebaseui-auth-container' />
            </div>
        )
    }

}

export default Login;
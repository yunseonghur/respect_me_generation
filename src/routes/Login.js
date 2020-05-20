import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import fire from '../fire'
import * as firebaseui from 'firebaseui'
import '../routes/Login.css';

/**
 * This component lets users login via their Google account.
 */

// firebase login authentication UI
const ui = new firebaseui.auth.AuthUI(fire.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.        
        return true;
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInFlow: 'popup',
    signInSuccessUrl: '/#',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };

const fireui = function (elementId) {
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

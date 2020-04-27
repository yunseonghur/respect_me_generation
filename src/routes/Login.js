import React, { Component } from 'react';
// import fireui from '../fireui';
import firebase from 'firebase';
import fire from '../fire'
import * as firebaseui from 'firebaseui'
import Home from '../routes/Home';
import navigation from '../components/Navigation'

// import "./Login.css";

const ui = new firebaseui.auth.AuthUI(fire.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // navigation.setState({ loggedIn: true });
        this.setState({
            logInStatus: "Log Out",
        })
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
    constructor() {
        super();
        this.state ={
            logInStatus: "Log In",
            user: {},
        }
    }

    componentDidMount(){
        fireui('#firebaseui-auth-container')
        // var user = firebase.auth().currentUser;
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if(user){
        //         var name = user.displayName;
        //         console.log(name);
        //     }
        // })
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
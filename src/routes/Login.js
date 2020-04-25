import React, { Component } from 'react';
import fireui from '../fireui';

// import "./Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user: {},
        }
    }

    componentDidMount(){

        fireui('#firebaseui-auth-container')

        // fireui.start("#firebaseui-auth-container", {
        //     signInOptions: [
        //         firebase.auth.GoogleAuthProvider.PROVIDER_ID
        //     ]
        // });

        // fire('#login')
        // this.authListener();
    }

    // authListener() {
    //     App.fire.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.setState({ user });
    //         } else {
    //             this.setState({ user: null });
    //         }
    //     });
    // }
    render() {
        return (
            <div className="login">
                <div id='firebaseui-auth-container'></div>
                {/* {this.state.user ? console.log("Logged in"): console.log("Not logged in") } */}
                
            </div>
        )
    }
}




// function Login(){
//     return (
//         <div>
//             <span>This is a page for Login</span>
//         </div>
//     );
// }


export default Login;
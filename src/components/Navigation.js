import React, { Component } from 'react';
import fire from '../fire';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../components/Navigation.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogOutModal from "./LogOutModal";


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            logOutModal: false
        };
        this.db = fire.database();
        this.authListener = this.authListener.bind(this);
        this.writeUserData = this.writeUserData.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    writeUserData(userId, name, email) {
        this.db.ref('User/' + userId).update({
            name: name,
            email: email
        })
    }

    addUserData(userId){
        this.db.ref('User/'+userId).once('value')
        .then(function(snapshot){
            // if points not exist, set default points and badge
            if(!(snapshot.child('points').exists())){
                fire.database().ref('User/' + userId).update({
                    points: 10,
                    badge: 'basic'
                })
            }
        });
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                this.writeUserData(user.uid, user.displayName, user.email);
                this.addUserData(user.uid);

            } else {
                this.setState({ user: null });
            }

        })
    }

    render() {
        return( 
            <div className="navWrapper">
                <Nav.Link style={{display: "inline-block"}} href="/" id="brand">RESPECT ME GENERATION</Nav.Link>
                <Nav style={{float: "right", marginRight: "10px"}} pullRight>
                    { this.state.user ? <Nav.Link href="#profile"><FontAwesomeIcon className="navItem" icon={faUser} /></Nav.Link> : null}
                    <Nav.Link href="#communityBoard"><FontAwesomeIcon className="navItem" icon={faBullhorn} /></Nav.Link>
                    <Nav.Link href="#resources"><FontAwesomeIcon className="navItem" icon={faLightbulb} /></Nav.Link>
                    { this.state.user ?
                        <Nav.Link style={{fontSize: "10pt", fontWeight: "600", border: "1px solid black", borderRadius: "15px"}} className="navItem" onClick={()=>this.setState({logOutModal: true})} >LOGOUT</Nav.Link>
                        : <Nav.Link style={{fontSize: "10pt", fontWeight: "600", border: "1px solid black", borderRadius: "15px"}} className="navItem" href='#login'>LOGIN</Nav.Link>}
                </Nav>
                <LogOutModal show={this.state.logOutModal} onHide={()=> this.setState({logOutModal: false})}/>
            </div>
        )
    }
}

export default Navigation;

// <img src="https://img.icons8.com/material-outlined/24/000000/person-male.png" alt="Profile"/>
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
import ReactTooltip from 'react-tooltip';

/**
 * Navigation bar
 */
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            logOutModal: false,
        };
        this.db = fire.database();
        this.authListener = this.authListener.bind(this);
        this.writeUserData = this.writeUserData.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    /**
     * Save user information to Firebase
     * @param {firebaseUser.uid} userId 
     * @param {firebaseUser.name} name 
     * @param {string} email 
     */
    writeUserData(userId, name, email) {
        this.db.ref('User/' + userId).update({
            name: name,
            email: email
        })
    }

    /**
     * Adds points and assign badge to first time users
     * @param {firebaseUser.uid} userId 
     */
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

    /**
     * Authentication listener
     */
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
                    { this.state.user ? <span data-for='main' data-tip='Profile'><Nav.Link href="#profile"><FontAwesomeIcon className="navItem" icon={faUser} /></Nav.Link></span> : null}
                    <span data-for='main' data-tip='Community Board'><Nav.Link href="#communityBoard"><FontAwesomeIcon className="navItem" icon={faBullhorn} /></Nav.Link></span>
                    <span data-for='main' data-tip='Resources'><Nav.Link href="#resources"><FontAwesomeIcon className="navItem" icon={faLightbulb} /></Nav.Link></span>
                    { this.state.user ?
                        <Nav.Link style={{fontSize: "10pt", fontWeight: "600", border: "1px solid black", borderRadius: "15px"}} 
                        className="navItem" onClick={()=>this.setState({logOutModal: true})} >LOGOUT</Nav.Link>
                        : <Nav.Link style={{fontSize: "10pt", fontWeight: "600", border: "1px solid black", borderRadius: "15px"}} 
                        className="navItem" href='#login'>LOGIN</Nav.Link>}
                    <ReactTooltip id='main' place='bottom' type='dark' effect='float' />
                </Nav>
                <LogOutModal show={this.state.logOutModal} onHide={()=> this.setState({logOutModal: false})}/>
            </div>
        )
    }
}

export default Navigation;
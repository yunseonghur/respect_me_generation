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
                <Navbar expand="sm">
                    <Navbar.Brand href="/" id="brand">Respect Me<br/>Generation</Navbar.Brand>
                    <Navbar.Toggle id="navBtb" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            { this.state.user ? <a data-for='main' data-tip='Profile'><Nav.Link href="#profile"><FontAwesomeIcon className="navItem" icon={faUser} /></Nav.Link></a> : null}
                            <a data-for='main' data-tip='Community Board'><Nav.Link href="#communityBoard"><FontAwesomeIcon className="navItem" icon={faBullhorn} /></Nav.Link></a>
                            <a data-for='main' data-tip='Resources'><Nav.Link href="#resources"><FontAwesomeIcon className="navItem" icon={faLightbulb} /></Nav.Link></a>
                            { this.state.user ?
                                <Nav.Link className="navItem" onClick={()=>this.setState({logOutModal: true})} >Log Out</Nav.Link>
                                : <Nav.Link className="navItem" href='#login'>Log In</Nav.Link>}
                            <ReactTooltip id='main' place='bottom' type='dark' effect='float' />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <LogOutModal show={this.state.logOutModal} onHide={()=> this.setState({logOutModal: false})}/>
            </div>
        )
    }
}

{/* <Link tooltip="Upload a video">
    <Button onClick={this.uploadHandler} disabled>
        <img src="https://img.icons8.com/material-outlined/24/000000/camcorder-pro.png" alt="Upload a video"/>
    </Button>
</Link>
<Link href='#createCard' tooltip="Add a card"><img src="https://img.icons8.com/android/24/000000/note.png" alt="Add a card"/></Link>
<Button rotate={true}><img src="https://img.icons8.com/android/24/000000/plus.png" alt="Add"/></Button> */}

export default Navigation;

// <img src="https://img.icons8.com/material-outlined/24/000000/person-male.png" alt="Profile"/>
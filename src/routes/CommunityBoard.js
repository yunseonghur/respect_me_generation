import React from 'react';
import './CommunityBoard.css';
import Board from '../components/Board';
import { Container, Button, Link } from 'react-floating-action-button';
import fire from '../fire.js';
import Toast from 'react-bootstrap/Toast'


// firebase needed to relate current user with upload
const db = fire.database();

/**
 * The entire page containing the Board component and handles posting
 * cards and video via the big red (+) button.
 */
class CommunityBoard extends React.Component{

    state = {
        cards: [],
        videos: [],
        isLoading: true, // true if the server is still loading cards data
        visible: true,  // true if cards are visible & false if videos are visible
        show: false,
        userUID: null,   // the current user
        badge: "",
        points: "",       // means user is not logged in
        displayErrorMessage: false
    };

    getBadgePoints = () => {
        db.ref().child('User').on('value', snap => {
            const snapshot = snap.val();
            console.log(snapshot[this.state.userUID]['badge']);
            this.setState({
                badge: snapshot[this.state.userUID]['badge'],
                points: snapshot[this.state.userUID]['points']
            });
            // console.log(this.state.badge);
        });
    }

    componentDidMount() {
        // get references that DON'T change
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userUID: user.uid,
                })
                console.log("Logged in. UID: " + this.state.userUID);
                this.getBadgePoints();
            } else {
                console.log("you're not logged in.")
            }
        })
    }

    uploadHandler = () => {
        console.log("uploadhandler was clicked");

        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: "respectmegen", 
            tags: ['project'],
            uploadPreset: 'h5awwspl',
            showAdvancedOptions: true }, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the video info: ', result.info);
                console.log("public_id: " + result.info.public_id);
                console.log("userUID in createWidget: " + this.state.userUID);
                
                if (this.state.userUID != null) {
                    // store the id into the current user:
                    var key = db.ref().child('videos').push().key;

                    var updates = {};
                    updates['/videos/' + key] = result.info.public_id;

                    db.ref('User/' + this.state.userUID).update(updates);

                    console.log("video " + result.info.public_id + "added to user " + this.state.userUID);

                    this.increasePoints(this.state.userUID);
                
                } else if (this.state.userUID == null) {
                    console.log("Videos can only be uploaded by members.")
                }

              }
            }
        )
        
        // only users with 100+ points can upload videos
        console.log("current badge: " + this.state.badge + "\ncurrent points: " + this.state.points);
        if (this.state.userUID != null && this.state.badge === "advanced") {
            myWidget.open();
        } else {
            this.setState({
                displayErrorMessage: true
            })
        }
    }

    increasePoints(currentUser){
        console.log("increase points");
        db.ref('User/'+ currentUser).once('value')
            .then(function(snapshot){
                let points = snapshot.child('points').val()
                points += 20
                console.log(points)
                fire.database().ref('User/' + currentUser).update({
                    points
            })
        });
    }

    render() {

        return (
            <div>
                <Toast onClose={() => {this.setState({displayErrorMessage: false})}} show={this.state.displayErrorMessage} delay={3000}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Action not permitted.</strong>
                    </Toast.Header>
                    <Toast.Body>Only users with a 'advanced' badge may post.</Toast.Body>
                    <Toast.Body>Post more to level up!</Toast.Body>
                </Toast>
                
                <Board />

                <Container>
                    <Link tooltip="Upload a video">
                        <Button onClick={this.uploadHandler} disabled>
                            <img src="https://img.icons8.com/material-outlined/24/000000/camcorder-pro.png" alt="Upload a video"/>
                        </Button>
                    </Link>
                    <Link href='#createCard' tooltip="Add a card"><img src="https://img.icons8.com/android/24/000000/note.png" alt="Add a card"/></Link>
                    <Button rotate={true}><img src="https://img.icons8.com/android/24/000000/plus.png" alt="Add"/></Button>
                </Container>
            </div>
        )}
}

export default CommunityBoard;
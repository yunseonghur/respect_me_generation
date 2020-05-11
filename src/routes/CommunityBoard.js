import React from 'react';
import './CommunityBoard.css';
import Board from '../components/Board';
import { Container, Button, Link } from 'react-floating-action-button';
import fire from '../fire.js';


// firebase needed to relate current user with upload
const db = fire.database();

/**
 * The entire page containing the actual board.
 * Also includes the upload buttons.
 */
class CommunityBoard extends React.Component{
    state = {
        cards: [],
        videos: [],
        isLoading: true, // true if the server is still loading cards data
        visible: true,  // true if cards are visible & false if videos are visible
        show: false,
        userUID: null   // the current user
    };

    componentDidMount() {
        // get references that DON'T change
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    userUID: user.uid,
                })
                console.log("Logged in. UID: " + this.state.userUID);
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
                
                } else if (this.state.userUID == null) {
                    console.log("video uploaded, but user wasn't logged in.")
                }

              }
            }
        )
        
        // todo: do not open widget if user not logged in!
        if (this.state.userUID != null) {
            myWidget.open();
        } else {
            alert("only users can upload videos!");
        }
    }

    render() {

        return (
            <div>
                <Board></Board>

                <Container>
                    <Link tooltip="Upload a video"><Button onClick={this.uploadHandler} ><img src="https://img.icons8.com/material-outlined/24/000000/camcorder-pro.png"/></Button></Link>
                    <Link href='#createCard' tooltip="Add a card"><img src="https://img.icons8.com/android/24/000000/note.png"/></Link>
                    <Button rotate={true}><img src="https://img.icons8.com/android/24/000000/plus.png"/></Button>
                </Container>
            </div>
        )}
}

export default CommunityBoard;
import React from 'react';
import './Board.css';
import Tag from './Tag';
import Cards from './Cards';
import VideoDisplay from "./VideoDisplay";
import { Container, Button, Link } from 'react-floating-action-button';
import fire from '../fire.js';

const db = fire.database();

class Board extends React.Component{

    state ={
        userUID: null
    }

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
            uploadPreset: 'h5awwspl'}, (error, result) => { 
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
        myWidget.open();
    }

    // TODO: Replace hardcoded tags (line14~)
    render() {
        return (
            <div className="text-center">
                <h2>COMMUNITY BOARD</h2>
                <h5>What is your community talking about today?</h5>

                <div className="tagGroup">
                    <Tag tagName="Studying"></Tag>
                    <Tag tagName="Sports"></Tag>
                    <Tag tagName="Arts"></Tag>
                </div>

                <Container>
                {/* <Link to='createCard' className="btn btn-primary">Add Card</Link> */}
                    {/* <button onClick={this.uploadHandler}><img src="https://img.icons8.com/material-outlined/24/000000/camcorder-pro.png"/></button> */}
                    <Link tooltip="Upload a video"><Button onClick={this.uploadHandler} ><img src="https://img.icons8.com/material-outlined/24/000000/camcorder-pro.png"/></Button></Link>
                    <Link href='#createCard' tooltip="Add a card"><img src="https://img.icons8.com/android/24/000000/note.png"/></Link>
                    <Button rotate={true}><img src="https://img.icons8.com/android/24/000000/plus.png"/></Button>
                </Container>

                <Cards></Cards>
                <VideoDisplay></VideoDisplay>
            </div>
        )}
}

export default Board;
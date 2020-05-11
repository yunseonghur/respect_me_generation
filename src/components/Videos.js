import React, { Component } from 'react';
import VideoDisplay from "./VideoDisplay";
import fire from '../fire.js';


const db = fire.database();

/**
 * !!! DEPRECIATED -- please make video-related changes on CommunityBoard !!!
 * The upload functionality has been moved as a button onto the CommunityBoard page.
 * File retained for reference only.
 */
class Videos extends Component {

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
            uploadPreset: 'h5awwspl',
            showAdvancedOptions: true}, (error, result) => { 
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

    render() {
        return(
            <div className="container">
                <button onClick={this.uploadHandler}>Upload File</button>
                <div>
                    <VideoDisplay />
                </div>
            </div>
        )
    }
}

export default Videos;
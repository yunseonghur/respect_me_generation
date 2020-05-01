import React, { Component } from 'react';
import VideoDisplay from "../components/VideoDisplay";
import fire from '../fire.js';


const db = fire.database();

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
            uploadPreset: 'h5awwspl'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the video info: ', result.info);
                console.log("public_id: " + result.info.public_id); 
                
                if (this.state.userUID) {
                    // store the id into the current user:
                    var key = db.ref().child('videos').push().key;
                    
                    var updates = {};
                    updates['/videos/' + key] = result.info.public_id;

                    db.ref('User/' + this.state.userUID + '/video').update(updates);

                    console.log("video id" + result.info.public_id + "added to user " + this.state.userUID);
                
                } else if (!this.state.userUID) {
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
            <div>
                <h1>Upload a Video</h1>
                <button onClick={this.uploadHandler}>Upload File</button>
                <h2>Showing all current videos</h2>
                <div>
                    <VideoDisplay />
                </div>
            </div>
        )
    }
}

export default Videos;

// https://234536288681363:aMMSnPSTD2UlFH35lI4uay7oOpA@api.cloudinary.com/v1_1/respectmegen/resources/video



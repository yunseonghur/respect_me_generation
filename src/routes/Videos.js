import React, { Component } from 'react';
import VideoDisplay from "../components/VideoDisplay";
import { Video, Transformation } from 'cloudinary-react';
import axios from 'axios';

class Videos extends Component {

    state ={
        cloudname: "respectmegen"
    }

    uploadHandler = () => {
        console.log("uploadhandler was clicked");
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: this.state.cloudname, 
            tags: ['project'],
            uploadPreset: 'h5awwspl'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info); 
              }
            }
          )
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



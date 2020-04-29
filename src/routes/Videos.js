import React, { Component } from 'react';
import Uploader from "../components/Uploader";
import { Video, Transformation } from 'cloudinary-react';
import { Player } from 'video-react';

function Videos(){
    return (
        <div>
            <h1>Upload a Video</h1>
            <Uploader name="sherry" age="999" />
            <Uploader name="koof" age="888">"My longtime neighbor."</Uploader>
            <button>Switch Name</button>
        </div>
    );
}

class UploadVid extends Component {

    state ={
        cloudname: "respectmegen"
    }

    uploadHandler = () => {
        console.log("uploadhandler was clicked");
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: this.state.cloudname, 
            uploadPreset: 'h5awwspl'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info); 
              }
            }
          )
        myWidget.open();
    }

    showVideoHandler = () => {
        console.log("showhandler was clicked");
    }

    render() {
        return(
            <div>
                <h1>Upload a Video</h1>
                <button onClick={this.uploadHandler}>Upload File</button>
                <h2>Showing all current videos</h2>
                <button onClick={this.showVideoHandler}>Show all videos</button>
                <div>
                <Video controls cloudName={this.state.cloudname} publicId="ifvmawhn3oivphchla8z" >
                    <Transformation width="511" crop="scale" />
                </Video>
                </div>
            </div>
        )
    }
}

export default UploadVid;

// https://234536288681363:aMMSnPSTD2UlFH35lI4uay7oOpA@api.cloudinary.com/v1_1/respectmegen/resources/video



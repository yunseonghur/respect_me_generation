import React, { Component } from 'react';
import Uploader from "../components/Uploader";

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

    componentDidMount() {
        // move the var here once its working
    }

    uploadHandler = () => {
        console.log("was clicked");
        const myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'respectmegen', 
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
            </div>
        )
    }
}

export default UploadVid;



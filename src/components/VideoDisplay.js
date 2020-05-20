import React, { Component } from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';
import axios from 'axios';
import '../components/VideoDisplay.css';

/**
 * Gets all videos from Cloudinary API.
 * In order to use the Video component, npm install cloudinary-react
 * Called in MiniBoard.js
 */
class VideoDisplay extends Component {

    state = {
        videos: []
    }

    getVideos() {
        axios.get('https://res.cloudinary.com/respectmegen/video/list/project.json')
          .then(res => {
            this.setState({ videos: res.data.resources});
    });
    }

    componentDidMount() {
        this.getVideos();
    }

    render() {

        // update video state
        const {videos} = this.state;

        return (
            <div>
                <CloudinaryContext cloudName="respectmegen">
                    {
                        // map 
                        videos.map((data, index) => (
                            <div className="videoElement" key={index}>
                                <Video publicId={data.public_id} width="100%" height="100%" controls></Video>
                            </div>
                        ))
                    }
                </CloudinaryContext>
            </div>
        );
    }

}

export default VideoDisplay;
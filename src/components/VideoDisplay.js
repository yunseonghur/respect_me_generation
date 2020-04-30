import React, { Component } from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';
import axios from 'axios';

class VideoDisplay extends Component {

    state = {
        videos: []
    }

    getVideos() {
        axios.get('http://res.cloudinary.com/respectmegen/video/list/project.json')
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources});
    });
    }

    getMyVideos() {
        
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
                            <div className="col-sm-3" key={index}>
                                    <Video publicId={data.public_id} width="350" controls></Video>
                            </div>
                        ))
                    }
                </CloudinaryContext>
            </div>
        );
    }

}

export default VideoDisplay;
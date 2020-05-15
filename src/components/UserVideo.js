import React from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';

const UserVideo = (props) => {
    return (
        <div style={{display: "inline-block", margin: "10px", maxWidth: "400px"}}>
            <CloudinaryContext cloudName="respectmegen">
                {<Video publicId={props.videoId} width="100%" height="100%" controls></Video>}
            </CloudinaryContext>
        </div>
    );
}

export default UserVideo;
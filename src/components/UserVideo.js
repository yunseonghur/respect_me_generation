import React from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';

const UserVideo = (props) => {
    return (
        <div style={{display: "inline-block", margin: "10px"}}>
            <CloudinaryContext cloudName="respectmegen">
                {<Video publicId={props.videoId} width="380" height="245" controls></Video>}
            </CloudinaryContext>
        </div>
    );
}

export default UserVideo;
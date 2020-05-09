import React from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';

const UserVideo = (props) => {
    return (
        <div>
            <CloudinaryContext cloudName="respectmegen">
                {<Video publicId={props.videoId} width="350" controls></Video>}
            </CloudinaryContext>
        </div>
    );
}

export default UserVideo;
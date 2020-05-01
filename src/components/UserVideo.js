import React, { Component } from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';

const UserVideo = (props) => {
    return (
        <div>
            <CloudinaryContext cloudName="respectmegen">
                {
                    <div>
                    <Video publicId={props.videoId} width="350" controls></Video>
                    </div>
                }
            </CloudinaryContext>
        </div>
    );
}

export default UserVideo;
import React from 'react';
import { CloudinaryContext, Video } from 'cloudinary-react';

/**
 * Displays videos of current user.
 * Called in Profile.js
 * 
 * @param {string} videoId the unique videoID (public_id) needed to display 
 * using the Cloudinary component. Stored in User under 'video'. 
 */
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
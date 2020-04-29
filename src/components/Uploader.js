import React from 'react';
import CloudinaryContext from 'cloudinary-react';

const uploader = (props) => {
    return (
        <div>
            <p>i'm {props.name} and {props.age} years old!</p>
            <p>{props.children}</p>
        </div>
    )
}

export default uploader;
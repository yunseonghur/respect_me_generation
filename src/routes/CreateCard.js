import React from 'react';
// import "./Home.css";

function CreateCard(){
    return (
        <div>
            <div id='selectImg'>
                <span>
                    1. Select image
                </span>
                <div className='jumbotron'>
                    <div>Img1</div>
                    <div>Img2</div>
                    <div>Img3</div>
                </div>
            </div>
        </div>
    );
}



export default CreateCard;
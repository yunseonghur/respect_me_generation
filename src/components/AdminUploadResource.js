import React from 'react';
import { useState } from 'react';
import "./AdminUploadResource.css"
import fire from '../fire.js';

const db = fire.database();

/**
 * Admin use to upload a resource to firebase.
 */
const AdminUploadResource = () => {

    const styles = {
        container: {
            border: '1px solid black',
            marginTop: '50px',
            padding: '10px',
            textAlign: 'left'
        }
    }

    // const [title, setTitle] = useState("");
    // const [img, setImg] = useState("");
    // const [url, setUrl] = useState("");
    // const [category, setCategory] = useState("");

    /* stores input entry into database */
    const handleSubmit = (e) => {
        var key = db.ref().child('study').push().key;
            
        db.ref("Resources/").child('study/' + key).set({
            image: e.target.resImage.value,
            link: e.target.resLink.value,
            tag: 'study',
            title: e.target.resTitle.value
        }).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        }) 
    }

    return (

        <div className="resource_upload--container" style={styles.container}>
            <h1>Admin Use: Upload a Resource</h1>
            <p>(*currently only adds to study category)</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <p>Resource Title:</p>
                        <input type="text" name="resTitle" />
                    </label>
                    <label>
                        <p>Resource Url:</p>
                        <input type="text" name="resLink" />
                    </label>
                </div>

                <div>
                    <label>
                        <p>Resource Image Url:</p>
                        <input type="text" name="resImage" />
                    </label>
                    <label>
                        <p>Resource Category:</p>
                        <select>
                            <option defaultValue value="study">study</option>
                            <option value="health">health</option>
                            <option value="relationships">relationships</option>
                        </select>
                    </label>
                </div>

                <br/><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>

    );
}

export default AdminUploadResource;
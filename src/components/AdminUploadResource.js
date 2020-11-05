import React from 'react';
import "./AdminUploadResource.css"

/**
 * Admin use to upload a resource to firebase.
 */
const AdminUploadResource = () => {

    const styles = {
        container: {
            backgroundColor: 'beige',
            marginTop: '50px',
            marginRight: '100px',
            marginLeft: '100px',
            padding: '10px',
            textAlign: 'left'
        }
    }

    return (

        <div className="resource_upload--container" style={styles.container}>
            <h1>Admin Use: Upload a Resource</h1>
            <form>
                <div>
                    <label>
                        Resource Title:
                        <input type="text" name="res-title" />
                    </label>
                    <label>
                        Resource Link:
                        <input type="text" name="res-link" />
                    </label>
                </div>

                <div>
                    <label>
                        Resource Image:
                        <input type="text" name="res-image" />
                    </label>
                    <label>
                        Resource Category:
                        <input type="text" name="res-image" />
                    </label>
                </div>

                <br/><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>

    );
}

export default AdminUploadResource;
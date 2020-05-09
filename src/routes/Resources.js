import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import fire from '../fire.js';
import ResourceEntry from "../components/ResourceEntry";

// get reference to firebase
const db = fire.database();

class Resources extends Component{

    state = {
        titles: [],
        content: []
    }

    getResources() {
        let dbTitles = [];
        let dbContent = [];

        db.ref('Resources/').once('value', snap => {

            snap.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                dbTitles.push(childKey);
                console.log("title: " + childKey);
                var childData = childSnapshot.val();
                dbContent.push(childData);
                console.log("text body: " + childData)
            })

            console.log(dbTitles);
            console.log(dbContent);

            this.setState({
                titles: dbTitles,
                content: dbContent
            })
        })
    }

    componentDidMount() {
        this.getResources();
    }

    render() {

        const {titles, content} = this.state;

        return (
                <div className="base">
                    <h1>Resources</h1>
                    
                    <Accordion className="accordion">
                        {
                            titles.map((data, index) => (
                                <ResourceEntry key={index} title={data} content={content[index]} eventKey={index} />
                            ))
                        }
                    </Accordion>
                </div>
        );
    }
}


export default Resources;

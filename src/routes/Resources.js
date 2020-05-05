import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
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
                    <p>Get accesses to resources to improve yourself in different areas!</p>
                    
                    {/* set the defaultActiveKey to whichever section you want to START expanded. */}
                    <Accordion defaultActiveKey="1" className="accordion">
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

// <ResourceEntry title="Title 1" content="hello world" eventKey="1" />

// this was the old one that doesn't work because of lack of arrow function!
    // getResources2() {
    //     let dbTitles = [];
    //     let dbContent = [];

    //     db.ref('Resources/').once('value', function(snapshot) {
    //         snapshot.forEach(function(childSnapshot) {
    //             var childKey = childSnapshot.key;
    //             dbTitles.push(childKey);
    //             console.log("title: " + childKey);
    //             var childData = childSnapshot.val();
    //             dbContent.push(childData);
    //             console.log("text body: " + childData)
    //         })

    //         console.log(dbTitles);
    //         console.log(dbContent);

    //         this.setState({
    //             titles: dbTitles,
    //             content: dbContent
    //         })

    //     })

    // }
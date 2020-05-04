import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import fire from '../fire.js';

// get reference to firebase
const db = fire.database();


class Resources extends Component{

    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            text: []
        };
    }

    getResources() {
        let dbTitles = [];
        let dbText = [];

        db.ref('Resources/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                dbTitles.push(childKey);
                console.log("title: " + childKey);

                var childData = childSnapshot.val();
                dbText.push(childData);
                console.log("text body: " + childData)
            })

            // scope is only local
            console.log(dbTitles);
            console.log(dbText);

        })
    }

    componentDidMount() {
        this.getResources();
    }

    render() {
        return (
                <div className="base">
                    <h1>Resources</h1>
                    <p>Get accesses to resources to improve yourself in different areas!</p>
                    
                    {/* set the defaultActiveKey to whichever section you want to START expanded. */}
                    <Accordion defaultActiveKey="0" className="accordion">
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">Title 1</Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                
                            </Card.Body>
                        </Accordion.Collapse>
                    
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">Title 2</Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                
                            </Card.Body>
                        </Accordion.Collapse>

                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">Title 3</Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                
                            </Card.Body>
                        </Accordion.Collapse>

                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">Title 4</Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                
                            </Card.Body>
                        </Accordion.Collapse>
                    
                    </Accordion>
                </div>
        );
    }
}



export default Resources;
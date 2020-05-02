import React, { Component} from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class Resources extends Component{

    render() {
        return (
            
                <div className="base">
                    <h1>Resources</h1>
                    <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            Click me!
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Heyyyy</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                            Click me!
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                </div>

        );
    }
}



export default Resources;
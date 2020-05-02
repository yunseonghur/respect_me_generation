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
                    <p>Get accesses to resources to imrpove in different areas!</p>
                    
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
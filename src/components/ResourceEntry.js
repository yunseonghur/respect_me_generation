import React from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

/**
 * Represents a resource page entry. 
 * 
 * props:
 * - title = title of the accordion fold
 * - content = content that appears after fold is opened
 * - eventKey = if this entry starts OPEN, match this num with the defaultActiveKey 
 * 
 * @param {*} props 
 */
const ResourceEntry = (props) => {

    return (
        <div>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={props.eventKey}>{props.title}</Accordion.Toggle>
            <Accordion.Collapse eventKey={props.eventKey}>
            <Card.Body>{props.content}</Card.Body>
            </Accordion.Collapse>
        </div>
    )

}

export default ResourceEntry;
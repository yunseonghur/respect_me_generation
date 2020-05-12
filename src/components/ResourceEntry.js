import React from 'react';
import "../routes/Resources.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { ResourceImage } from './HomeResourceEntry';


/**
 * Represents a resource page entry. 
 * 
 * props:
 * - title = title of the accordion fold
 * - contents = content that appears after fold is opened
 * - eventKey = if this entry starts OPEN, match this num with the defaultActiveKey 
 * 
 * @param {*} props 
 */

class ResourceEntry extends React.Component{

    render(){
        return (
            <div>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey={this.props.eventKey}>{this.props.title}</Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.eventKey}>
                <Card.Body>
                    {(this.props.contents.map((entry)=> 
                    <ResourceImage key={entry.id} image={entry.image} title={entry.title} link={entry.link} />
                    ))}
                </Card.Body>
                </Accordion.Collapse>
            </div>
        );
    }
}

export default ResourceEntry;
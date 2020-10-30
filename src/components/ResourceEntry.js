import React, { Component } from 'react';
import "./ResourceEntry.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ResourceImage from './ResourceImage';
import fire from '../fire.js';

const dbRef = fire.database().ref();

/**
 * Represents a accordion fold on the Resources ROUTE. 
 * ! fix the component so its only getting data for its category
 * -> now it prints 3 times
 * 
 * @param {*} tag 
 * @param {*} eventKey decides which fold is opened after click
 * @param {*} defaultActiveKey decides which fold is opened at FIRST
 */
class ResourceEntry extends Component{

  state = {
    entries: []
  };

  componentWillMount() {
    this.getResourceEntry();
  }

  /**
   * Parse the objects from firebase into lists.
   * 
   * @param {Object}  
   * @param {String} resourceType the tag prop
   */
  parseResource(resourceObj, resourceType) {
    const parsed = Object.keys(resourceObj).map((key, index) => {
        return resourceObj[key];
    })

    this.setState({entries: parsed});
  }

  /**
   * populate resources
   */
  getResourceEntry() {
    // read all resources from db
    dbRef.child('Resources').child(this.props.tag).once('value').then(function(snap) {
        const result = snap.val();
        // console.log(result);

        return result;
    })
        .then((res) => {
            this.parseResource(res, this.props.tag);
        })
        .catch((err) => {
            console.log(err);
        })
  }

  render(){
    return (
      <div className="resource-entry">
        <Accordion.Toggle 
            className="resource-entry__card--header" 
            as={Card.Header} 
            variant="link" 
            eventKey={this.props.eventKey}
        >
          {this.props.tag}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.eventKey}>
          <Card.Body className="resource-entry__card--body">
            {(this.state.entries.map((entry, index)=> 
            <ResourceImage 
              className="resource-entry__card--img"
              key={index} 
              image={entry.image} 
              title={entry.title} 
              link={entry.link} />
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </div>
    );
  }
}

export default ResourceEntry;
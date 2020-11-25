import React, { Component } from 'react';
import "./ResourceEntry.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ResourceImage from './ResourceImage';
import { withRouter } from 'react-router-dom';
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fire from '../fire.js';

const dbRef = fire.database().ref();

/**
 * @deprecated
 */
class ResourceEntry extends Component{

  state = {
    entries: [],
    isPreview: false
  };

  componentWillMount() {
    this.getResourceEntry();
    this.setState({isPreview: this.props.isPreview});
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

  /**
   * Go to Resource page with clicked tab open
   * @param {*} event 
   */
  toResource = (event) => {
    let categoryClicked = this.props.eventKey;

    this.props.history.push({
      pathname: "/resources",
      state: {detail: categoryClicked}
    });
  }

  render(){
    return (

        <div>
        {this.state.isPreview ? (
            <div className="hre">
            <div className="hre__header">
              <h1 className="hre__title">#{this.props.tag}</h1>
              <button className="hre__btn--more" name={this.props.eventKey} onClick={this.toResource}>
                  <FontAwesomeIcon icon={faArrowCircleRight} />
              </button>
            </div>
            {this.state.entries.map((entry, index)=> 
              <ResourceImage 
                key={index} 
                title={entry.title} 
                image={entry.image}
                link={entry.link} />
            )}
          </div>
        ) : (
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
        )}
      </div>

    )
  }
  
}

export default withRouter(ResourceEntry);
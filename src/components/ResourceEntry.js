import React, { Component } from 'react';
import "./ResourceEntry.css";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ResourceImage from './ResourceImage';
import ARTICLES from '../components/ResourceArticles';

/**
 * Represents a accordion fold on the Resources ROUTE. 
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

  getResourceEntry() {
    // Grabbing all content from ARTICLES
    let resources = [];

    ARTICLES.map(ARTICLE => {
      resources.push({
        id: ARTICLE.id,
        title: ARTICLE.title,
        image: ARTICLE.image,
        tag: ARTICLE.tag,
        link: ARTICLE.link
      });
      return null; 
    })

    // Filtering: gets the resource article with a particular tag
    let articleEntries = [];

    for (let entry in resources) {
      if (resources[entry].tag === this.props.tag){
        articleEntries.push(resources[entry]);
      } else {
        console.log("no such tag found in articles.");
      }
    }

    // set the state of this component to match tag
    this.setState({ entries: articleEntries});
  }

  render(){
    return (
      <div className="resource-entry">
        <Accordion.Toggle className="resource-entry__card--header" as={Card.Header} variant="link" eventKey={this.props.eventKey}>
          {this.props.tag}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.eventKey}>
          <Card.Body className="resource-entry__card--body">
            {(this.state.entries.map((entry)=> 
            <ResourceImage 
              className="resource-entry__card--img"
              key={entry.id} 
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
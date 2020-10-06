import React from 'react';
import '../components/HomeResourceEntry.css';
import ResourceImage from '../components/ResourceImage';
import ARTICLES from '../components/ResourceArticles';
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';


/**
 * @param {string} tag the resource entry category (e.g. "study")
 * @param {int} eventKey the number indicating which accordion section is current open (see React-Boostrap Accordion)
 */
class HomeResourceEntry extends React.Component{
  state = {
    entries: []
  };

  componentWillMount() {
    // this.setState({ entries: this.props.resourcesEntries })
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

  toResource = (event) => {
    let categoryClicked = this.props.eventKey;

    this.props.history.push({
      pathname: "/resources",
      state: {detail: categoryClicked}
    });
  }

  render(){
    return (
      <div className="hre">
        <div className="hre__header">
          <h1 className="hre__title">#{this.props.tag}</h1>
          <button className="hre__btn--more" name={this.props.eventKey} onClick={this.toResource}>
              <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </div>
        {this.state.entries.map((entry)=> 
          <ResourceImage 
            key={entry.id} 
            title={entry.title} 
            image={entry.image}
            link={entry.link} />
        )}
      </div>
    )
  }
}

export default withRouter(HomeResourceEntry);
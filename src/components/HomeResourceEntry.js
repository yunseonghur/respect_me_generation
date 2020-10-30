import React from 'react';
import '../components/HomeResourceEntry.css';
import ResourceImage from '../components/ResourceImage';
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';
import fire from '../fire.js';

const dbRef = fire.database().ref();

/**
 * @param {string} tag the resource entry category (e.g. "study")
 * @param {int} eventKey the number indicating which accordion section is current open (see React-Boostrap Accordion)
 */
class HomeResourceEntry extends React.Component{
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
   * populate resource sections
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
        {this.state.entries.map((entry, index)=> 
          <ResourceImage 
            key={index} 
            title={entry.title} 
            image={entry.image}
            link={entry.link} />
        )}
      </div>
    )
  }
}

export default withRouter(HomeResourceEntry);
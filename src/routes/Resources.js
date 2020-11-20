import React, { Component } from "react";
import "../routes/Resources.css";
import AdminUploadResource from "../components/AdminUploadResource";
import { withRouter } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import fire from "../fire.js";
import ResourceEntryCard from "../components/ResourceEntryCard";

const dbRef = fire.database().ref();
const db = fire.database();

/**
 * The resource page is a React-Bootstrap accordion Component.
 * Each accordion 'fold' is its own component: ResourceEntry.
 */
class Resources extends Component {
  tags = ["all", "study", "health", "relationship"];

  state = {
    isLoading: true,
    tag: "all",
    entries: [],
    userUID: null,
  };

  componentDidMount() {
    // may need to flatten database
    this.getResources("study");
    this.getResources("health");
    this.getResources("relationships");
    this.getUserUID();
  }

  /**
   * Get current user ID
   */
  getUserUID = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userUID: user.uid,
        });
      }
    });
  };

  /**
   * Grab resources from database.
   */
  getResources = (tag) => {
    // read all resources from db
    dbRef
      .child("Resources")
      .child(tag)
      .once("value")
      .then(function (snap) {
        const result = snap.val();
        // console.log(result);
        return result;
      })
      .then((res) => {
        this.parseResource(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Parse the objects from firebase into entries.
   *
   * @param {Object}
   * @param {String} resourceType the tag prop
   */
  parseResource(resourceObj) {
    const parsed = Object.keys(resourceObj).map((key) => {
      resourceObj[key]["key"] = key;
      return resourceObj[key];
    });

    this.setState({ entries: [...this.state.entries, ...parsed] });
  }

  /**
   * Event handler for tag selection.
   */
  handleTag = (event) => {
    event.preventDefault();
    this.setState({
      tag: event.target.name,
    });
  };

  render() {
    return (
      <div className="resources_wrapper">
        <h2>RESOURCES</h2>
        <ButtonGroup>
          {this.tags.map((value, index) => (
            <Button
              name={value}
              key={index}
              onClick={this.handleTag}
              variant="outline-primary"
              className="rounded-pill community-board__toggle-buttons--btn"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        <div className="resource_row">
          {this.state.entries
            ? this.state.entries.map((item, index) => (
                // <a className="resource_row--item" key={index} href={item.link} target="_blank">
                //   <button onClick={(e) => this.addToSaved(e, item)}>+</button>
                //   <img alt="resource" src={item.image} />
                //   <div>
                //     <h2>{item.title}</h2>
                //     <h4>should attribute to database -- some short preview of article</h4>
                //   </div>
                // </a>
                <ResourceEntryCard key={index} item={item} />
              ))
            : null}
        </div>
        <AdminUploadResource />
      </div>
    );
  }
}

export default withRouter(Resources);

/* <Accordion className="resources_accordion" defaultActiveKey={this.getContentClicked()}>
                        <ResourceEntry 
                            tag="study" 
                            eventKey="0" 
                            defaultActiveKey={this.state.categoryClicked} 
                        /> 
                        <ResourceEntry 
                            tag="health" 
                            eventKey="1" 
                            defaultActiveKey={this.state.categoryClicked} 
                        /> 
                        <ResourceEntry 
                            tag="relationships" 
                            eventKey="2" 
                            defaultActiveKey={this.state.categoryClicked} 
                        /> 
                    </Accordion> */

/**
 * If this route is being accessed via the Home (via clicking the resource arrow),
 * the corresponding section that was clicked on is opened by default.
 */
// getContentClicked(){
//     if (this.props.location != null) {
//         if (this.props.location.state != null){
//             let categoryClicked = this.props.location.state.detail
//             return categoryClicked
//         }
//     } else {
//         console.log("no default key passed in") // do not open any section
//         return "0"
//     }
// }

import React, { Component } from "react";
import "../routes/Resources.css";
import AdminUploadResource from "../components/AdminUploadResource";
import { withRouter } from "react-router-dom";
import fire from "../fire.js";
import ResourceEntryCard from "../components/ResourceEntryCard";

const db = fire.database();
/**
 * The resources page where they can view and save resources.
 */
class Resources extends Component {
  tags = ["all", "study", "health", "relationship"];

  state = {
    isLoading: true,
    tag: "all",
    entries: [],
    savedResources: [],
  };

  componentDidMount() {
    // may need to flatten database
    this.getResources("study");
    this.getResources("health");
    this.getResources("relationships");
    this.getSavedResources();
  }

  /**
   * Grab resources from database.
   */
  getResources = (tag) => {
    // read all resources from db
    db.ref()
      .child("Resources")
      .child(tag)
      .once("value")
      .then(function (snap) {
        const result = snap.val();
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
   * Get a list of saved resources
   */
  getSavedResources = () => {
    db.ref()
      .child("User/" + this.props.userUID)
      .child("savedResources")
      .once("value")
      .then(function (snap) {
        const result = snap.val();
        return result;
      })
      .then((res) => {
        if (res !== null) {
          this.parseSavedResource(res);
        }
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
   * Parse the objects from firebase into entries.
   *
   * @param {Object}
   */
  parseSavedResource(resourceObj) {
    const parsed = Object.keys(resourceObj).map((key) => {
      return key;
    });
    this.setState({ savedResources: [...this.state.savedResources, ...parsed] });
  }

  /**
   * Event handler for saving resource. Needs to be passed on to the child component.
   * @param {*} event
   */
  addToSaved = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    db.ref("User/" + this.props.userUID)
      .child("savedResources/" + item["key"])
      .set({
        image: item["image"],
        link: item["link"],
        title: item["title"],
      });
    // call getSavedResources to update savedResources state on button click
    this.getSavedResources();
  };

  render() {
    return (
      <div className="resources_wrapper">
        <h2>RESOURCES</h2>
        <div className="resource_row">
          {this.state.entries
            ? this.state.entries.map((item, index) => (
                <ResourceEntryCard
                  key={index}
                  item={item}
                  userUID={this.props.userUID}
                  saved={this.state.savedResources.includes(item["key"])}
                  addToSaved={this.addToSaved}
                />
              ))
            : null}
        </div>
        <AdminUploadResource />
      </div>
    );
  }
}

export default withRouter(Resources);

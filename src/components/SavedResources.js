import React, { Component } from "react";
import fire from "../fire.js";
import ResourceEntryCard from "./ResourceEntryCard.js";

const dbRef = fire.database().ref();

/**
 * Displays saved resources in Dashboard.
 */
class SavedResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedResources: [],
    };
    this.getSavedResources();
  }
  /** Get saved resources from firebase */
  getSavedResources() {
    dbRef.child("User").on("value", (snap) => {
      const userInfo = snap.val()[this.props.userUID]["savedResources"];
      if (userInfo) {
        this.parseResource(userInfo);
      }
    });
  }

  /**
   * Parse the objects from firebase into lists.
   *
   * @param {Object}
   * @param {String} resourceType the tag prop
   */
  parseResource(resourceObj) {
    const parsed = Object.keys(resourceObj).map((key, index) => {
      return resourceObj[key];
    });

    this.setState({ savedResources: parsed });
  }

  render() {
    return (
      <div className="resources_wrapper">
        <div className="resource_row">
          {this.state.savedResources
            ? this.state.savedResources.map((resource, index) => (
                <ResourceEntryCard
                  key={index}
                  item={resource}
                  userUID={this.props.userUID}
                  from="dashboard"
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default SavedResources;

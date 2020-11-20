import React, { Component } from "react";
import fire from "../fire.js";
import Testing from "../Testing.js";

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
      this.parseResource(userInfo);
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
      <div>
        {this.state.savedResources.map((resource, index) => (
          <Testing key={index} img={resource.image} title={resource.title} />
        ))}
      </div>
    );
  }
}

export default SavedResources;

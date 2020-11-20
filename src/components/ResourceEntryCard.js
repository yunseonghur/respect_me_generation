import React, { Component } from "react";
import "../routes/Resources.css";
import fire from "../fire.js";
import "./ResourceEntryCard.css";

const dbRef = fire.database().ref();
const db = fire.database();

/**
 * Displays each resource entry in a card-like format.
 */
class ResourceEntryCard extends Component {
  /**
   * Event handler for saving resource.
   * @param {*} event
   */
  addToSaved = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    db.ref("User/" + this.state.userUID)
      .child("savedResources/" + item["key"])
      .set({
        image: item["image"],
        link: item["link"],
        title: item["title"],
      });
  };
  render() {
    return (
      <a
        className="resource-entry-card__anchor"
        key={this.props.key}
        href={this.props.item.link}
        target="_blank"
      >
        <button onClick={(e) => this.addToSaved(e, this.props.item)}>+</button>
        <img alt="resource" src={this.props.item.image} />
        <div>
          <h2>{this.props.item.title}</h2>
          <h4>should attribute to database -- some short preview of article</h4>
        </div>
      </a>
    );
  }
}

export default ResourceEntryCard;

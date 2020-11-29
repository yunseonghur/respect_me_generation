import React, { Component } from "react";
import "../routes/Resources.css";
import fire from "../fire.js";
import "./ResourceEntryCard.css";

const db = fire.database();

/**
 * Displays each resource entry in a card-like format.
 */
class ResourceEntryCard extends Component {
  state = {
    saved: "",
  };
  componentDidMount() {
    this.setState({ saved: this.props.saved });
  }
  // /**
  //  * Event handler for saving resource.
  //  * @param {*} event
  //  */
  // addToSaved = (event, item) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   event.nativeEvent.stopImmediatePropagation();
  //   db.ref("User/" + this.props.userUID)
  //     .child("savedResources/" + item["key"])
  //     .set({
  //       image: item["image"],
  //       link: item["link"],
  //       title: item["title"],
  //     });
  // };

  render() {
    return (
      <a className="resource-entry-card__anchor" href={this.props.item.link} target="blank">
        {this.props.from === "dashboard" || this.props.saved ? null : (
          <button onClick={(e) => this.props.addToSaved(e, this.props.item)}>+</button>
        )}

        <img alt="resource" src={this.props.item.image} />
        <div>
          <h2>{this.props.item.title}</h2>
        </div>
      </a>
    );
  }
}

export default ResourceEntryCard;

import React, { Component } from "react";
import "../routes/Resources.css";
import "./ResourceEntryCard.css";

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

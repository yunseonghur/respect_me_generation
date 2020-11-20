import React, { Component } from "react";
import "../routes/Resources.css";
import fire from "../fire.js";
import "./ResourceEntryCard.css";
import Toast from 'react-bootstrap/Toast'

const db = fire.database();

/**
 * Displays each resource entry in a card-like format.
 */
class ResourceEntryCard extends Component {

    state = {
        showToast: false,
        className: "showing"
    }

    /**
     * Event handler for saving resource.
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

        this.setState({className: "hide"});
    };

    render() {

        return (
        <a
            className="resource-entry-card__anchor"
            key={this.props.key}
            href={this.props.item.link}
            target="blank"
        >
            {this.props.from === "dashboard" ? null : (
                <button className={this.state.className} onClick={(e) => this.addToSaved(e, this.props.item)}>+</button>
            )}

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

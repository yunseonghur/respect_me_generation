import React, { Component } from "react";
import "../components/Comment.css";

/**
 * Displays the commenter and comment.
 * Called in AddComment.js
 *
 * @param {firebaseUser.name} user commenter
 * @param {string} comment
 */
class Comment extends Component {
  timestamp = new Date(this.props.timestamp);
  date = this.timestamp.getDate();
  month = this.timestamp.getMonth() + 1;
  year = this.timestamp.getFullYear();
  hour = this.timestamp.getHours();
  minute = "0" + this.timestamp.getMinutes();
  formattedDate =
    this.year +
    "/" +
    this.month +
    "/" +
    this.date +
    " at " +
    this.hour +
    ":" +
    this.minute.substr(-2);
  render() {
    return (
      <div className="comment">
        <div className="comment__bottom-border">
          <span className="comment__bottom-border--commenter">{this.props.user}</span>
          <span className="comment__bottom-border--date">{this.formattedDate}</span>
        </div>
        <h5 className="comment__comment-text">{this.props.comment}</h5>
      </div>
    );
  }
}

export default Comment;

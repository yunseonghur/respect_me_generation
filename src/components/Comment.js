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
  render() {
    return (
      <div className="comment">
        <div className="comment__bottom-border">
          <h4 className="comment__bottom-border--commenter">{this.props.user}</h4>
        </div>
        <h5 className="comment__comment-text">{this.props.comment}</h5>
      </div>
    );
  }
}

export default Comment;

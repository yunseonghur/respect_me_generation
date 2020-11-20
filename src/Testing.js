import React, { Component } from "react";

/**
 * Displays saved resources in Dashboard.
 */
class Testing extends Component {
  render() {
    return (
      <div>
        <img src={this.props.img} />
        <div>{this.props.title}</div>
      </div>
    );
  }
}

export default Testing;
// Array.from(this.state.videos).map((myVideo) => (
//   <UserVideo key={myVideo.id} videoId={myVideo.id} />
// ))}

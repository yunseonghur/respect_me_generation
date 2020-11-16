import React, { Component } from "react";
class ChallengeIcon extends Component {
  render() {
    return (
      <svg
        className={this.props.className}
        width="140"
        height="140"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 98.134V134.371C17.5 137.48 20.0156 140 23.1187 140H116.881C119.984 140 122.5 137.48 122.5 134.371V59.0825C122.5 55.9737 119.984 53.4535 116.881 53.4535H105.995V4.93206C105.995 1.23444 102.08 -1.14465 98.8065 0.564162L64.6689 18.3869C61.1097 20.2451 61.1525 25.362 64.7423 27.1602L97.5669 43.6026V53.4535H87.0318C83.9286 53.4535 81.413 55.9737 81.413 59.0825V77.3769H54.7241C51.6209 77.3769 49.1054 79.8971 49.1054 83.0059V92.5049H23.1187C20.0156 92.5049 17.5 95.0252 17.5 98.134Z"
          fill="black"
        />
      </svg>
    );
  }
}

export default ChallengeIcon;

import React, { Component } from "react";
class BookMarkIcon extends Component {
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
        <g clip-path="url(#clip0)">
          <path
            d="M99.1667 0H40.8333C32.795 0 26.25 6.53917 26.25 14.5833V137.083C26.25 138.262 26.9617 139.329 28.0525 139.778C29.1433 140.233 30.3975 139.977 31.2317 139.148L70 100.374L108.768 139.143C109.328 139.703 110.075 140 110.833 140C111.207 140 111.586 139.93 111.948 139.778C113.038 139.329 113.75 138.262 113.75 137.083V14.5833C113.75 6.53917 107.205 0 99.1667 0Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="140" height="140" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
}

export default BookMarkIcon;

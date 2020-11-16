import React, { Component } from "react";

class HomeFirstSectionLogo extends Component {
  render() {
    return (
      <>
        <svg
          className={this.props.className}
          width="361"
          height="327"
          viewBox="0 0 361 327"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d)">
            <path
              d="M82.1412 0C59.1908 0 40.6118 18.198 40.6118 40.6779C40.6118 63.1577 59.1908 81.3557 82.1412 81.3557C105.092 81.3557 123.671 63.1577 123.671 40.6779C123.671 18.198 105.092 0 82.1412 0ZM277.767 0C254.816 0 236.237 18.198 236.237 40.6779C236.237 63.1577 254.816 81.3557 277.767 81.3557C300.717 81.3557 319.296 63.1577 319.296 40.6779C319.296 18.198 300.717 0 277.767 0Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M357 147.725C355.907 242.461 277.22 318.464 180.5 318.464C148.807 318.464 118.752 309.901 93.0697 295.449C78.3158 303.478 63.0155 309.901 46.0759 314.183C32.9613 317.394 18.7539 319 4.54644 319C27.4969 319 46.0759 300.802 46.0759 278.322C46.0759 265.476 42.2508 253.166 35.1471 242.996C15.4752 215.164 4 181.98 4 145.584C4 126.85 19.8468 111.864 39.5186 112.934C57.5511 114.005 71.2121 129.527 71.2121 147.189C71.7585 193.755 103.452 233.362 146.621 247.278C157.003 250.49 168.478 252.631 179.954 252.631C240.062 252.631 289.242 204.995 289.242 145.584C289.242 125.78 306.728 110.793 326.946 112.934C344.432 115.075 357 130.597 357 147.725Z"
              fill="url(#paint1_linear)"
            />
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="361"
              height="327"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <linearGradient
              id="paint0_linear"
              x1="40.6118"
              y1="40.8117"
              x2="319.46"
              y2="40.8117"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.030878" stopColor="#008ACC" />
              <stop offset="0.2163" stopColor="#0BA8C3" />
              <stop offset="0.6179" stopColor="#26F3AD" />
              <stop offset="0.6772" stopColor="#2AFFA9" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="4"
              y1="215.913"
              x2="356.774"
              y2="215.913"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.030878" stopColor="#008ACC" />
              <stop offset="0.2163" stopColor="#0BA8C3" />
              <stop offset="0.6179" stopColor="#26F3AD" />
              <stop offset="0.6772" stopColor="#2AFFA9" />
            </linearGradient>
          </defs>
        </svg>
      </>
    );
  }
}

export default HomeFirstSectionLogo;

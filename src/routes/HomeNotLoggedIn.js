import React, { Component } from "react";
import HomeFirstSectionLogo from "../images/HomeFirstSectionLogo.js";
import "./HomeNotLoggedIn.css";

class HomeNotLoggedIn extends Component {
  render() {
    return (
      <>
        <div className="home-not-logged-in__container row">
          <div className="home-not-logged-in__container__left col">
            <div className="home-not-logged-in__container__left--header">
              <div>Respect</div>
              <div>
                Starts with <span>Me</span>
              </div>
            </div>
            <div className="home-not-logged-in__container__left--description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere posuere ipsum
              quis hendrerit. Etiam.
            </div>
            <div className="home-not-logged-in__container__left__button">
              {/* <button className="home-not-logged-in_container__left__button--login">LOGIN</button> */}
            </div>
          </div>
          <div className="home-not-logged-in__container__right col">
            <HomeFirstSectionLogo />
          </div>
        </div>
      </>
    );
  }
}

export default HomeNotLoggedIn;

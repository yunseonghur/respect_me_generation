import React, { Component } from "react";
import fire from "../fire";
import Nav from "react-bootstrap/Nav";
import "../components/Navigation.css";
import LogOutModal from "./LogOutModal";
import ReactTooltip from "react-tooltip";
import FloatingButton from "./FloatingButton";
import RMG_PrimaryIcon from "../images/RMG_PrimaryIcon.svg";
import UserProfileInactiveIcon from "../images/UserProfileInactiveIcon.svg";
import ResourceInactiveIcon from "../images/ResourceInactiveIcon.svg";
import CommunityInactiveIcon from "../images/CommunityInactiveIcon.svg";
import UserProfileActiveIcon from "../images/UserProfileActiveIcon.svg";
import ResourceActiveIcon from "../images/ResourceActiveIcon.svg";
import CommunityActiveIcon from "../images/CommunityActiveIcon.svg";
import { withRouter } from "react-router";

/**
 * Navigation bar
 */
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userImage: "",
      logOutModal: false
    };
    this.db = fire.database();
    this.authListener = this.authListener.bind(this);
    this.writeUserData = this.writeUserData.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  /**
   * Save user information to Firebase
   * @param {firebaseUser.uid} userId
   * @param {firebaseUser.name} name
   * @param {string} email
   */
  writeUserData(userId, name, email) {
    this.db.ref("User/" + userId).update({
      name: name,
      email: email,
    });
  }

  /**
   * Adds points and assign badge to first time users
   * @param {firebaseUser.uid} userId
   */
  async addUserData(userId) {
    await this.db
      .ref("User/" + userId)
      .once("value")
      .then(function (snapshot) {
        // if points not exist, set default points and badge
        if (!snapshot.child("points").exists()) {
          fire
            .database()
            .ref("User/" + userId)
            .update({
              points: 10,
              badge: "basic",
            });
        }
      });
  }

  /**
   * Authentication listener
   */
  async authListener() {
    await fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          userImage: user.photoURL
        });
        this.writeUserData(user.uid, user.displayName, user.email);
        this.addUserData(user.uid);
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className="navigation">
        <Nav className="navbar navbar-expand">
          <a className="navigation__brand" href="/">
            <img className="navigation__brand--img" src={RMG_PrimaryIcon} alt="logo"></img>
          </a>    
            {this.state.user ? (
              <div className="navbar-nav w-100 justify-content-center">
                <span data-for="main" data-tip="Dashboard">
                  {this.props.location.pathname === "/" ? 
                    <Nav.Link className="navigation__item" id="active" href="/">
                      <img className="navigation__item--img" src={UserProfileActiveIcon} />
                    </Nav.Link>
                    : 
                    <Nav.Link className="navigation__item" href="/">
                      <img className="navigation__item--img" src={UserProfileInactiveIcon} />
                    </Nav.Link>
                  }
                </span>
                <span data-for="main" data-tip="Resources">
                  {this.props.location.pathname === "/resources" ? 
                    <Nav.Link className="navigation__item" id="active" href="#resources">
                      <img className="navigation__item--img" src={ResourceActiveIcon} />
                    </Nav.Link>
                    : 
                    <Nav.Link className="navigation__item" href="#resources">
                      <img className="navigation__item--img" src={ResourceInactiveIcon} />
                    </Nav.Link>
                  }
                </span>
                <span data-for="main" data-tip="Community Board">
                  {this.props.location.pathname === "/communityBoard" ? 
                    <Nav.Link className="navigation__item" id="active" href="#communityBoard">
                      <img className="navigation__item--img" src={CommunityActiveIcon} />
                    </Nav.Link>
                    : 
                    <Nav.Link className="navigation__item" href="#communityBoard">
                      <img className="navigation__item--img" src={CommunityInactiveIcon} />
                    </Nav.Link>
                  }
                </span>
              </div>
              ) 
              : null}
            <div className="nav navbar-nav justify-content-end">
                {this.state.userImage === "" ? (
                <div className="navigation__item--user-image_loader"/>
              ) : (
                <div>
                  <img className="navigation__item--user-image rounded-pill"
                    src={this.state.userImage}
                    alt="Profile Pic"
                  />
                  <Nav.Link
                    className="navigation__item navigation__item--logout"
                    onClick={() => this.setState({ logOutModal: true })}
                  >
                    Log Out
                  </Nav.Link>
                </div>
              )}
            </div>
          <ReactTooltip id="main" place="bottom" type="dark" effect="float" />
        </Nav>

        <LogOutModal
          show={this.state.logOutModal}
          onHide={() => this.setState({ logOutModal: false })}
        />

        <FloatingButton />
      </div>
    );
  }
}

export default withRouter(Navigation);


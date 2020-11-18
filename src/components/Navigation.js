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


/**
 * Navigation bar
 */
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userImage: "",
      profileIcon: UserProfileInactiveIcon,
      resourceIcon: ResourceInactiveIcon,
      communityIcon: CommunityInactiveIcon,
      logOutModal: false,
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

  getProfileActiveIcon = () => {
    this.setState({ profileIcon: UserProfileActiveIcon });
  }

  getProfileInactiveIcon = () => {
    this.setState({ profileIcon: UserProfileInactiveIcon });
  }

  getResourceActiveIcon = () => {
    this.setState({ resourceIcon: ResourceActiveIcon });
  }

  getResourceInactiveIcon = () => {
    this.setState({ resourceIcon: ResourceInactiveIcon });
  }

  getCommunityActiveIcon = () => {
    this.setState({ communityIcon: CommunityActiveIcon });
  }

  getCommunityInactiveIcon = () => {
    this.setState({ communityIcon: CommunityInactiveIcon });
  }

  render() {
    return (
      <div className="navigation">
        <nav className="navbar navbar-expand justify-content-center">
          <a className="navigation__brand" href="/">
            <img className="navigation__brand--img" src={RMG_PrimaryIcon}></img>
          </a>    
          <div className="navbar-collapse collapse w-100">
            <div className="navbar-nav w-100 justify-content-center">
              {this.state.user ? (
                <span data-for="main" data-tip="Dashboard" onMouseOver={this.getProfileActiveIcon} onMouseLeave={this.getProfileInactiveIcon}>
                  <Nav.Link href="/">
                    <img className="navigation__item" src={this.state.profileIcon} />
                  </Nav.Link>
                </span>) 
                : null}
                <span data-for="main" data-tip="Resources" onMouseOver={this.getResourceActiveIcon} onMouseLeave={this.getResourceInactiveIcon}>
                  <Nav.Link href="#resources">
                  <img className="navigation__item" src={this.state.resourceIcon} />
                  </Nav.Link>
                </span>
                <span data-for="main" data-tip="Community Board" onMouseOver={this.getCommunityActiveIcon} onMouseLeave={this.getCommunityInactiveIcon}>
                  <Nav.Link href="#communityBoard">
                    <img className="navigation__item" src={this.state.communityIcon} />
                  </Nav.Link>
                </span>
            </div>
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
          </div>
          <ReactTooltip id="main" place="bottom" type="dark" effect="float" />
        </nav>

        <LogOutModal
          show={this.state.logOutModal}
          onHide={() => this.setState({ logOutModal: false })}
        />

        <FloatingButton />
      </div>
    );
  }
}

export default Navigation;

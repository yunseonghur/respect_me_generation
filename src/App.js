import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import CommunityBoard from "./routes/CommunityBoard";
import Resources from "./routes/Resources";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Navigation from "./components/Navigation";
import CreateCard from "./routes/CreateCard";
import Dashboard from "./routes/Dashboard";
import "./App.css";
import fire from "./fire.js";

function App() {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    authListener();
  });
  /**
   * Authentication listener
   */
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  };

  const hideLogin = () => {
    document.getElementById("firebaseui-auth-container").style.visibility = "hidden";
  };
  const displayLogin = () => {
    document.getElementById("firebaseui-auth-container").style.visibility = "unset";
  };

  return (
    <HashRouter>
      <Navigation />
      {user ? (
        <Route path="/" exact={true} component={Dashboard} />
      ) : (
        <Route path="/" exact={true} component={Login} />
      )}
      <Route path="/communityBoard" component={CommunityBoard} />
      <Route path="/resources" component={Resources} />
      <Route path="/profile" component={Profile} />
      <Route path="/createCard" component={CreateCard} />
    </HashRouter>
  );
}

export default App;

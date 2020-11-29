import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import CommunityBoard from "./routes/CommunityBoard";
import Resources from "./routes/Resources";
import Login from "./routes/Login";
import Navigation from "./components/Navigation";
import Dashboard from "./routes/Dashboard";
import "./App.css";
import fire from "./fire.js";

function App() {
  const [user, setUser] = useState(null);
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

  return (
    <HashRouter>
      <Navigation />
      {user ? (
        <>
          <Route path="/" exact={true} component={Dashboard} />
          <Route path="/communityBoard" component={() => <CommunityBoard tagVisible={true} />} />
          <Route path="/resources" component={() => <Resources userUID={user.uid} />} />
        </>
      ) : (
        <Route path="/" exact={true} component={Login} />
      )}
    </HashRouter>
  );
}

export default App;

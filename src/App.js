import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import CommunityBoard from "./routes/CommunityBoard";
import Resources from "./routes/Resources";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Navigation from "./components/Navigation";
import CreateCard from "./routes/CreateCard";
import Dashboard from "./routes/Dashboard";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/communityBoard" component={CommunityBoard} />
      <Route path="/resources" component={Resources} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/createCard" component={CreateCard} />
      <Route path="/dashboard" component={Dashboard} />
    </HashRouter>
  );
}

export default App;

import React from 'react';
import { HashRouter, Route} from "react-router-dom";
import Home from "./routes/Home";
import Cards from "./routes/Cards";
import Videos from "./routes/Videos";
import Resources from "./routes/Resources";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Navigation from "./components/Navigation";
import CreateCard from "./routes/CreateCard";


function App() {
  return (
    <HashRouter>
    <Navigation />
    <Route path="/" exact={true} component={Home} />
    <Route path="/cards" component={Cards} />
    <Route path="/videos" component={Videos} />
    <Route path="/resources" component={Resources} />
    <Route path="/profile" component={Profile} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/createCard" component={CreateCard} />
  </HashRouter>
  );
}


export default App;

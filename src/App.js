import React from 'react';
import { HashRouter, Route} from "react-router-dom";
import Home from "./routes/Home";
import Cards from "./routes/Cards";
import Videos from "./routes/Videos";
import Resources from "./routes/Resources";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Navigation from "./components/Navigation";

// vimeo setup
let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("{client_id}", "{client_secret}", "{access_token}");

client.request({
  method: 'GET',
  path: '/tutorial'
}, function (error, body, status_code, headers) {
  if (error) {
    console.log(error);
  }

  console.log(body);
})

// router set-up
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
  </HashRouter>
  );
}

export default App;

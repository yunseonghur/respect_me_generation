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
// let Vimeo = require('vimeo').Vimeo;
// let client = new Vimeo("25903f6c93e3886c976e7b1adb63b9502c11d557", 
//                        "aEmQLq7mW/gQTfr1m0vlqVXbfKQK67/Fq+A9FRAP5d38PMy8oQUSQiBe4RdlceoebdX3ZjslGDBcRHMLIio/JqBwRJKGDIJ99ISw3nTV/XFVU0dcHkpzDrWzE6zrdn5H", 
//                        "f45d721eef18fb0613438b1344592716");

// client.request({
//   method: 'GET',
//   path: '/tutorial'
// }, function (error, body, status_code, headers) {
//   if (error) {
//     console.log("vimeo: " + error);
//   }

//   console.log("vimeo: " + body);
// })

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

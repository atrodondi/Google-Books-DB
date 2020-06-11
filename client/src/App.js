import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Jumbotron from "./components/jumbotron/jumbotron";
import searchPage from "./pages/search";
import savedPage from "./pages/saved";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Jumbotron />
          <br />
          <Route path="/" exact component={searchPage} />
        {/* <Route path="/saved" exact component={savedPage} /> */}
        </div>
      </Router>
    );
  }
}

export default App;

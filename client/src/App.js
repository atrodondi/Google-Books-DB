import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Jumbotron from "./components/jumbotron/jumbotron";
import searchPage from "./pages/search";
import savedPage from "./pages/saved";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <Navbar />
            <br />
            <Jumbotron />
            <br />
            <Route path="/" exact component={searchPage} />
            <Route path="/saved" exact component={savedPage} />
          </div>
          <div className="col-2"></div>
        </div>
      </Router>
    );
  }
}

export default App;

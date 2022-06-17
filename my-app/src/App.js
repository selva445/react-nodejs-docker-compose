import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <div className="App ">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;

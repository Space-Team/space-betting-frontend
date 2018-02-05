import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>

        </Router>
      </div>
    )
  }
}

export default App

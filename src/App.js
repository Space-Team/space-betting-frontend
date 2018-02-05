import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"




import Footer from "./Footer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>

        </Router>
        <Footer />
      </div>
    )
  }
}

export default App

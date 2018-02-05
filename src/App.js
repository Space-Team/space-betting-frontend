import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"




import Footer from "./Footer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route path="/main" render={()=><Main />} />

        </Router>
        <Footer />
      </div>
    )
  }
}

export default App

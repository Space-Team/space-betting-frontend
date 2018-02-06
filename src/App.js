import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"
import Login from "./Login"




import Footer from "./Footer"

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route path="/login" render={()=><Login />} />
          <Route path="/main" render={()=><Main />} />

        <Footer />
      </div>
      </Router>
    )
  }
}

export default App

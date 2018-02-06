import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"

const apiUrl = 'https://glacial-peak-21428.herokuapp.com/'

class App extends Component {

  state = {
  bets: [],
  }

  componentDidMount() {
    console.log('mounting')
    fetch(apiUrl + 'bets')
      .then(response => response.json())
      .then(data => {
        this.setState({
          bets: data.bets});
        console.log('bets', this.state.bets)
      });
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header />
<<<<<<< HEAD
          <Route path="/login" render={()=><Login />} />
//I think we only need the one Router wrapper
          <Route path="/main" render={()=><Main bets={this.state.bets}/>} />
>>>>>>> 3262b6515e3946371c9eb83df95ccec34ddfaa65

        <Footer />
      </div>
      </Router>
    )
  }
}

export default App

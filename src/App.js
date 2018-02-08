import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Login from "./Login"
import Logout from "./Logout"
import Profile from "./Profile"
import CreateUser from "./CreateUser"

const apiUrl = "http://planet-wager.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bets: [],
      users: [],
      creatorBets: [],
      acceptorBets: [],
      currentUser: {}
    }
    this.validate = this.validate.bind(this)
    this.putAcceptance = this.putAcceptance.bind(this)
    this.submitBet = this.submitBet.bind(this)
    this.getBets = this.getBets.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getBetsByCreator = this.getBetsByCreator.bind(this)
    this.getBetsByAcceptor = this.getBetsByAcceptor.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.checkResolves = this.checkResolves.bind(this)
  }

  componentDidMount() {
    this.getBets()
    this.getUsers()
    this.getBetsByCreator()
    this.getBetsByAcceptor()
    setTimeout(()=> {this.getCurrentUser()}, 500)
  }

  getBets() {
    fetch(apiUrl + "bets")
      .then(response => response.json())
      .then(data => {
        this.checkResolves(data.bets)
        this.setState({
          bets: data.bets
        })
      })
  }

  getUsers() {
    fetch(apiUrl + "users")
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.users
        })
      })
  }

  getBetsByCreator() {
    fetch(apiUrl + "creator-bets")
      .then(response => response.json())
      .then(data => {
        this.setState({
          creatorBets: data.bets
        })
      })
  }

  getBetsByAcceptor() {
    fetch(apiUrl + "acceptor-bets")
      .then(response => response.json())
      .then(data => {
        this.setState({
          acceptorBets: data.bets
        })
      })
  }

  checkResolves(bets) {
    bets.forEach(bet => {
      if (bet.creatorAttempt !== null && bet.creatorAttempt === bet.acceptorAttempt){
        fetch(apiUrl + "bets/" + bet.id, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({resolved: true, winner: bet.creatorAttempt})
        })
        .then(response => response.json())
        .then(response => fetch(apiUrl + "bets")
          .then(response => response.json())
          .then(data => {
            this.setState({
              bets: data.bets
            })
          }))
      }
    })
  }

  validate(e) {
    e.preventDefault()
    var form = new FormData(e.target)

    setTimeout(() => {
      this.state.users.forEach(user => {
        if (user.name !== form.get("userName")) {
          document.querySelector("#wrong-creds").className = ""
          return
        } else if (user.password !== form.get("userPass")) {
          document.querySelector("#wrong-creds").className = ""
          return
        }
        this.setState({ userName: form.get("userName") })
        window.sessionStorage.setItem("user", form.get("userName"))
        window.sessionStorage.setItem("id", user.id)
        window.sessionStorage.setItem("spacebucks", user.spacebucks)
        window.sessionStorage.setItem("avatar", user.image)
        window.sessionStorage.setItem("firstName", user.firstName)
        window.sessionStorage.setItem("lastName", user.lastName)
        window.sessionStorage.setItem("date", user.date)
        window.location.href = "/main"
      })
    }, 500)
  }

  putAcceptance(submission, id) {
    var url = apiUrl + "bets/" + id
    fetch(url, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(submission),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(data => {
        this.getBets()
        this.getBetsByCreator()
        this.getBetsByAcceptor()
        return data
      })
      .catch(error => console.error("Error:", error))
  }

  submitBet(e) {
    e.preventDefault()
    var form = new FormData(e.target)
    var sender = {
      description: form.get("bet_description"),
      amount: form.get("bet_amount"),
      accepted: false,
      resolved: false,
      creator: Number(window.sessionStorage.id),
      acceptor: null,
      winner: null,
      comment: ""
    }
    fetch(apiUrl + "bets", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(sender)
    })
      .then(response => response.json())
      .then(response => {
        this.getBets()
        this.getBetsByCreator()
        this.getBetsByAcceptor()
        return response
      })
      .catch(console.error)
  }

  getCurrentUser () {
    this.state.users.map(user => {
      if (window.sessionStorage.id == user.id) {
        this.setState({currentUser: user})
      }
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route path="/login" render={()=><Login users={this.state.users} validate={this.validate}/>} />
          <Route path="/new-user" render={()=><CreateUser users={this.state.users} getUsers={this.getUsers}/>}/>
          <Route path="/profile" render={()=><Profile currentUser={this.state.currentUser} users={this.state.users} getUsers={this.getUsers} bets={this.state.bets} getBets={this.getBets}/>} />
          <Route path="/main" render={()=><Main submitBet={this.submitBet} putAcceptance={this.putAcceptance} creatorBets={this.state.creatorBets} bets={this.state.bets} users={this.state.users} getBets={this.getBets} currentUser={this.state.currentUser}/>} />
          <Route path="/logout" render={()=><Logout />} />

      <Footer />
      </div>
      </Router>
    )
  }
}

export default App

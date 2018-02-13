import React, { Component } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Login from "./Login"
import Logout from "./Logout"
import Profile from "./Profile"
import CreateUser from "./CreateUser"

const apiUrl = "https://planet-wager.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bets: [],
      users: [],
      creatorBets: [],
      acceptorBets: [],
      currentUser: {},
      description: "",
      amount: ""
    }
    this.putAcceptance = this.putAcceptance.bind(this)
    this.submitBet = this.submitBet.bind(this)
    this.getBets = this.getBets.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getBetsByCreator = this.getBetsByCreator.bind(this)
    this.getBetsByAcceptor = this.getBetsByAcceptor.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.checkResolves = this.checkResolves.bind(this)
    this.specialCollect = this.specialCollect.bind(this)
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

  changeDescription(e){
    e.preventDefault()
    this.setState({ description: e.target.value })
  }

  submitBet(e, des, amo) {
    e.preventDefault()
    var sender = {
      description: des,
      amount: amo,
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
    // eslint-disable-next-line
    this.state.users.map(user => {
      if (Number(window.sessionStorage.id) === user.id) {
        this.setState({currentUser: user})
      }
    })
  }

  specialCollect(e){
    e.preventDefault()
    console.log("clicked")
		var newAmount
		this.state.users.forEach(user => {
			if (user.id === Number(window.sessionStorage.id)){
				newAmount = user.spacebucks + 100
			}
		})

		fetch(apiUrl + "users/" + Number(window.sessionStorage.id), {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "Application/json"
			}),
			body: JSON.stringify({spacebucks: newAmount})
		})
    .then(response => response.json())
    .catch(console.error)
    .then(response => this.getUsers())
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route exact path="/" render={() => <Redirect to="/main"/>}/>
          <Route path="/login" render={()=><Login users={this.state.users}/>} />
          <Route path="/new-user" render={()=><CreateUser users={this.state.users} getUsers={this.getUsers}/>}/>
          <Route path="/profile" render={()=><Profile currentUser={this.state.currentUser} users={this.state.users} getUsers={this.getUsers} bets={this.state.bets} getBets={this.getBets}/>} />
          <Route path="/main" render={()=><Main submitBet={this.submitBet} putAcceptance={this.putAcceptance} creatorBets={this.state.creatorBets} bets={this.state.bets} users={this.state.users} getUsers={this.getUsers} getBets={this.getBets} currentUser={this.state.currentUser}/>} />
          <Route path="/logout" render={()=><Logout />} />

      <Footer sc={this.specialCollect} users={this.state.users}/>
      </div>
      </Router>
    )
  }
}

export default App

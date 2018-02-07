import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Login from "./Login"
import Profile from "./Profile"
import CreateUser from "./CreateUser"

const apiUrl = 'https://planet-wager.herokuapp.com/'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bets: [],
      users: [],
      creatorBets: []
    }
    this.validate = this.validate.bind(this)
    this.putAcceptance = this.putAcceptance.bind(this)
    this.submitBet = this.submitBet.bind(this)
  }

  componentDidMount() {
    console.log('mounting')
    fetch(apiUrl + 'bets')
      .then(response => response.json())
      .then(data => {
        this.setState({
          bets: data.bets})
        console.log('bets', this.state.bets)
      })
    fetch(apiUrl + 'users')
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.users})
        console.log('users', this.state.users)
      })
    fetch(apiUrl + 'creator-bets')
      .then(response => response.json())
      .then(data => {
        this.setState({
          creatorBets: data.bets})
        console.log('creatorbets', this.state.creatorBets)
      })
  }

  validate(e){
    e.preventDefault()
    var form = new FormData(e.target)


    setTimeout(()=>{this.state.users.forEach(user => {
      if (user.name !== form.get("userName")){
        document.querySelector("#wrong-creds").className = ""
        return
      } else if (user.password !== form.get("userPass")){
        document.querySelector("#wrong-creds").className = ""
        return
      }
      this.setState({userName: form.get("userName")})
      window.sessionStorage.setItem("user", form.get("userName"))
      window.sessionStorage.setItem("id", user.id)
      window.sessionStorage.setItem("spacebucks", user.spacebucks)
      window.sessionStorage.setItem("avatar", user.image)
      window.sessionStorage.setItem("firstName", user.firstName)
      window.sessionStorage.setItem("lastName", user.lastName)
      window.sessionStorage.setItem("date", user.date)
      console.log(window.sessionStorage)
      window.location.href="/main"
    })}, 500)


  }

  putAcceptance (submission, id) {
    console.log(submission, id)
    var url = apiUrl + "bets/" + id
    fetch(url, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(submission),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    }).then(res => res.json())
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response))
    .then(data => {this.setState({bets: data})

  })
  }

  submitBet(e){
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
    .then(response => console.log(response))
    .catch(console.error)
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route path="/login" render={()=><Login users={this.state.users} validate={this.validate}/>} />
          <Route path="/new-user" render={()=><CreateUser users={this.state.users}/>}/>
          <Route path="/profile" render={()=><Profile />} />
          <Route path="/main" render={()=><Main submitBet={this.submitBet} putAcceptance={this.putAcceptance} creatorBets={this.state.creatorBets} bets={this.state.bets} users={this.state.users}/>} />
        <Footer />
      </div>
      </Router>
    )
  }
}

export default App

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
      userName: "",
      creatorBets: []
    }
    this.validate = this.validate.bind(this)
    this.putAcceptance = this.putAcceptance.bind(this)

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
      console.log(user)
      console.log(user.name && form.get("userName"))
      if (user.name !== form.get("userName")){
        console.log("no user with that username")
        return
        //append message
      } else if (user.password !== form.get("userPass")){
        console.log("bad password")
        return
        //append message
      }
      console.log("you made it through")
      this.setState({userName: form.get("userName")})
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
    // .then(res => {window.location.assign(homeUrl + '/success'); return res})
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", response))
    .then(data => {this.setState({bets: data})

  })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route path="/login" render={()=><Login users={this.state.users} validate={this.validate}/>} />
          <Route path="/new-user" render={()=><CreateUser users={this.state.users}/>}/>
          <Route path="/profile" render={()=><Profile />} />
          <Route path="/main" render={()=><Main putAcceptance={this.putAcceptance} creatorBets={this.state.creatorBets} bets={this.state.bets} users={this.state.users}/>} />
        <Footer />
      </div>
      </Router>
    )
  }
}

export default App

import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Login from "./Login"
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

  render() {
    return (
      <Router>
      <div className="App">
        <Header />
          <Route path="/login" render={()=><Login users={this.state.users} validate={this.validate}/>} />
<<<<<<< HEAD
          <Route path="/new-user" render={()=><CreateUser />}/>
          <Route path="/main" render={()=><Main bets={this.state.bets}/>} />
=======
          <Route path="/main" render={()=><Main creatorBets={this.state.creatorBets} bets={this.state.bets} users={this.state.users}/>} />
>>>>>>> fa9db53c7ab8c35e84deac4b240111c360abc471
        <Footer />
      </div>
      </Router>
    )
  }
}

export default App

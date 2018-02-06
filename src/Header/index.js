import React from "react"
import "./style.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Profile from '../Profile'

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  getProfile() {
    window.location.assign('./Profile')
  }

  render(){
    return(
      <div id="high">
        <div id="header-banner">
          <h1 id="logo">Planet Wager</h1>
          <img onClick={this.getProfile} src="https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_man-256.png"/>
        </div>
      </div>

    )
  }
}

export default Header

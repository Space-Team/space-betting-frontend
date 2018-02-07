import React from "react"
import "./style.css"
import Profile from '../Profile'

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  getImg(id){
    switch (id) {
      case "1":
        console.log("id 1")
        return "https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_man-256.png"
      case "2":
        console.log("id 2")
        return "https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_woman-256.png"
      case "3":
        console.log("id 3")
        return "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-256.png"
      case "4":
        console.log("id 4")
        return "https://cdn0.iconfinder.com/data/icons/everything-icons-vol-1/512/Earth-terra_nova-planet-space-world-globe-space-01-256.png"
      default:
        console.log("id undefined")
        return "http://www.janetallinger.com/images/icons/big/coin.png"
        break
    }
  }

  logout(){
    console.log("clicked")
    window.sessionStorage.clear()
  }

  render(){
    return(
      <div id="high">

        <div id="logo-banner">
          <a href="main"><h1 id="logo">Planet Wager</h1></a>
        </div>


        <div id="profile-menu">
          <a id="profile-button" href="/profile">
            <img src={this.getImg(window.sessionStorage.id)}/>
          </a>
          <div id="profile-dropdown">
            <a href="/Login">Login</a>
            <a href="/profile">Profile</a>
            <a href="/main" onClick={this.logout}>Logout</a>
          </div>
        </div>


      </div>

    )
  }
}

export default Header

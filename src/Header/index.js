import React from "react"
import "./style.css"
import Profile from '../Profile'

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  getProfile() {
    window.location.assign('./Profile')
  }

  render(){
    return(
      <div id="high">

        <div className="add-bet">
          <a id="add-bet" href="#">
            +
          </a>
          <div className="add-bet" id="add-bet-dropdown">
            <a href="#">Make a new bet</a>
          </div>
        </div>


        <div id="header-banner">
          <h1 id="logo">Planet Wager</h1>
          <img onClick={this.getProfile} src="https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_man-256.png"/>
        </div>


        <div className="profile-menu">
          <a id="add-story" href="/new-story">
            +
          </a>
          <div className="add-content">
            <a href="/new-story">Write A New Story</a>
          </div>
        </div>

        
      </div>

    )
  }
}

export default Header

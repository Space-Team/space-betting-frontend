import React from "react"
import "./style.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Profile from '../Profile'

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="header-banner">
        <h1>Planet Wager</h1>
        <Router>
          <div>
            <Link to="/profile">
              <img src="https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_man-256.png"/>
            </Link>
            <Route path="/profile" render={()=><Profile />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default Header

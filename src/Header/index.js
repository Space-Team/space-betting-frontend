import React from "react"
import "./style.css"

class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div id="header-banner">
        <h1>Planet Wager</h1>
      </div>
    )
  }
}

export default Header

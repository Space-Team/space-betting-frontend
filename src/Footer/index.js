import React from "react"
import './style.css'

const Footer = (props) => {
  return (
    <div id="footer-info">
      <div onClick={(e)=>{props.sc(e)}} >
        <img height="80px" src="./starman.png" alt="starman" />
      </div>
      <small className="copy">&copy; SpaceTeam Industries</small>
    </div>
  )
}

export default Footer

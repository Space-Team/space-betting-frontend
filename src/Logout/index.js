import React from "react"
import "./style.css"
import { Button } from 'antd'

class Logout extends React.Component {

  componentDidMount() {
    window.sessionStorage.clear()
  }


  render(){
    return(
      <div id="logout-container">
        <h2 className='welcome'>Logged out!</h2>
        <p>Return to earth! Or...</p>
        <Button className="loginbtn" href='/login'>Login</Button>
      </div>
    )
  }
}

export default Logout

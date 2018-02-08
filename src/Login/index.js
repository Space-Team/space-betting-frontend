import React from "react"
import "./style.css"

const apiUrl = "http://localhost:3000/"

class Login extends React.Component {

  forgot(){
    console.log("tough tootie!")
  }

  redirect(e){
    e.preventDefault()
    console.log("create user redirect: ", window.location.href = "/new-user")
  }


  render(){
    return(
      <div id="login-container">
        <h2 className='welcome'>Welcome... Login for Liftoff</h2>
        <form id="login-box" onSubmit={this.props.validate}>

          <label htmlFor="login-user-name">Username: </label>
          <input type="text" id="form-user-name" name="userName" />

          <label htmlFor="login-password">Password: </label>
          <input type="password" id="form-password" name="userPass" />

          <button id="forgot" type="button" onClick={this.forgot}>Forgot Something?</button>

          <button id="login-submitter" type="submit">Login</button>
          <p id="wrong-creds" className = "hidden">Username/Password are wrong...</p>
        </form>
        <button id="create-new-user" onClick={this.redirect}>Create a New Account</button>
      </div>
    )
  }
}

export default Login

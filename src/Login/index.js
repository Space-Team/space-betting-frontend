import React from "react"

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: ""
    }
  }

  componentDidMount(){
    console.log("component did mount")
  }

  forgot(){
    console.log("tough tootie!")
  }

  render(){
    return(
      <div id="login-container">
        <h2>Welcome...</h2>
        <form id="login-box">
          <h3>Login</h3>

          <label htmlFor="form-user-name">Choose a Username: </label>
          <input type="text" id="form-user-name" name="userName" />

          <label htmlFor="form-password">Password: </label>
          <input type="password" id="form-password" name="password" />

          <button type="button" onClick={this.forgot}>Forgot Something?</button>

          <button id="login-submitter" type="submit">Login</button>
        </form>
        <button id="create-new-user" onClick="location.href = '/create-account'">Create a New Account</button>
      </div>
    )
  }
}

export default Login

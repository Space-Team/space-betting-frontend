import React from "react"

class CreateUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: ""
    }
  }

  componentDidMount(){
    console.log("component did mount")
  }

  render(){
    return(
      <div id="login-container">
        <h2>Welcome...</h2>
        <form id="login-box">
          <h3>Login</h3>
          <label htmlFor="form-first-name">First Name: </label>
          <input type="text" id="form-first-name" name="firstName" />

          <label htmlFor="form-last-name">Last Name: </label>
          <input type="text" id="form-last-name" name="lastName" />

          <label htmlFor="form-first-name">First Name: </label>
          <input type="text" id="form-first-name" name="firstName" />

          <label htmlFor="form-user-name">Choose a Username: </label>
          <input type="text" id="form-user-name" name="userName" />

          <label htmlFor="form-password">Password: </label>
          <input type="password" id="form-password" name="password" />

          <label htmlFor="form-password-confirm">Confirm Password: </label>
          <input type="password" id="form-password-confirm" name="passwordConfirm" />

          <button id="login-submitter" type="submit">Login</button>
        </form>
        <button id="create-new-user" onclick="location.href = '/create-account'">Create a New Account</button>
      </div>
    )
  }
}

export default CreateUser

import React from "react"

const apiUrl = "https://glacial-peak-21428.herokuapp.com/"

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      userName: "",
      userPass: ""
    }
    this.validate = this.validate.bind(this)
  }


  componentDidMount(){
    fetch(apiUrl + 'users')
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.users
        })
      })
      .catch(console.error)
  }

  forgot(){
    console.log("tough tootie!")
  }

  validate(e){
    e.preventDefault()
    var form = new FormData(e.target)

    this.setState({userName: form.get("userName"), userPass: form.get("userPass")})

    setTimeout(()=>{this.state.users.forEach(user => {
      console.log(user)
      console.log(user.name && this.state.userName)
      if (user.name !== this.state.userName){
        console.log("no user with that username")
        return
        //append message
      } else if (user.password !== this.state.userPass){
        console.log("bad password")
        return
        //append message
      }
      console.log("you made it through")
    })}, 500)
  }

  redirect(e){
    e.preventDefault()
    console.log("create user redirect: ", "working")
  }


  render(){
    return(
      <div id="login-container">
        <h2>Welcome...</h2>
        <form id="login-box" onSubmit={this.validate}>
          <h3>Login</h3>

          <label htmlFor="form-user-name">Username: </label>
          <input type="text" id="form-user-name" name="userName" />

          <label htmlFor="form-password">Password: </label>
          <input type="password" id="form-password" name="userPass" />

          <button type="button" onClick={this.forgot}>Forgot Something?</button>

          <button id="login-submitter" type="submit">Login</button>
        </form>
        <button id="create-new-user" onClick={this.redirect}>Create a New Account</button>
      </div>
    )
  }
}

export default Login

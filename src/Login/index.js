import React from "react"
import "./style.css"

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      login: false,
      username: "",
      password: ""
    }
    this.login = this.login.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }

  forgot(){
    console.log("tough tootie!")
  }

  redirect(e){
    e.preventDefault()
    console.log("create user redirect: ", window.location.href = "/new-user")
  }

  changeUsername(e) {
    this.setState({username: e.target.value})
  }


  changePassword(e) {
    this.setState({password: e.target.value})
  }


  login(e) {
    e.preventDefault()
    setTimeout(() => {
      this.props.users.forEach(user => {
        if (user.name !== this.state.username) {
          return
        } else if (user.password !== this.state.password) {
          return
        }
        window.sessionStorage.setItem("user", this.state.username)
        window.sessionStorage.setItem("id", user.id)
        window.sessionStorage.setItem("spacebucks", user.spacebucks)
        window.sessionStorage.setItem("avatar", user.image)
        window.sessionStorage.setItem("firstName", user.firstName)
        window.sessionStorage.setItem("lastName", user.lastName)
        window.sessionStorage.setItem("date", user.date)
        this.setState({ login: true, username: "", password: "" })

      })

      if(this.state.login){
        document.querySelector("#wrong-creds").className = "hidden"
        document.querySelector("#great-creds").className = ""
        window.location.href = "/main"
        return
      }
      document.querySelector("#wrong-creds").className = ""
    }, 500)
  }

  render(){
    return(
      <div id="login-container">
        <h2 className='welcome'>Welcome... Login for Liftoff</h2>
        <form id="login-box" onSubmit={this.login}>

          <label htmlFor="login-user-name">Username: </label>
          <input type="text" id="form-user-name" value={this.state.value} onChange={this.changeUsername} />

          <label htmlFor="login-password">Password: </label>
          <input type="password" id="form-password" value={this.state.password} onChange={this.changePassword} />

          <button className="login-form-btn" id="forgot" type="button" onClick={this.forgot}>Forgot Something?</button>

          <button className="login-form-btn" id="login-submitter" type="submit">Login</button>
          <p id="wrong-creds" className = "hidden">Username/Password are wrong...</p>
          <p id="great-creds" className = "hidden">Looks good cadet.</p>
        </form>
        <button className="login-form-btn" id="create-new-user" onClick={this.redirect}>Create a New Account</button>
      </div>
    )
  }
}

export default Login

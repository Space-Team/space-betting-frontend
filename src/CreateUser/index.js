import React from "react"
import "./style.css"

const apiUrl = "https://planet-wager.herokuapp.com/users"

class CreateUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      unique: true,
      match: false,
      users: [],
      firstname: "",
      lastname: "",
      name: "",
      image: 0,
      spacebucks: 100,
      password: "",
      passTwo: ""
    }
    this.register = this.register.bind(this)
    this.checkName = this.checkName.bind(this)
    this.checkPass = this.checkPass.bind(this)
  }

  checkName(input){
    this.setState({unique: true})
    if (this.props.users.length < 1){
      return
    }
    this.props.users.forEach(user => {
      if (user.name === input){
        this.setState({unique: false})
        document.querySelector("#exists-warning").className = ""
      }
    })
  }

  checkPass(pass, conf){
    this.setState({match: false})
    if (pass === conf){
      this.setState({match: true})
    } else if (pass !== conf){
      document.querySelector("#mismatch-warning").className = ""
    }
  }

  changeFn = (e) => {
    this.setState({ firstname: e.target.value })
  }

  changeLn = (e) => {
    this.setState({ lastname: e.target.value })
  }

  changeUn = (e) => {
    this.setState({ name: e.target.value })
  }

  changeAv = (e) => {
    this.setState({ image: e.target.value })
  }

  changePw = (e) => {
    this.setState({ password: e.target.value})
  }

  changeP2 = (e) => {
    this.setState({ passTwo: e.target.value })
  }

  register(e){
    e.preventDefault()
    window.sessionStorage.clear()
    this.checkName(this.state.name)
    this.checkPass(this.state.password, this.state.passTwo)
    var sender = {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      name: this.state.name,
      image: this.state.image,
      spacebucks: 100,
      password: this.state.password
    }
    setTimeout(()=>{
    if (this.state.unique && this.state.match){
      fetch(apiUrl, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json"
        }),
        body: JSON.stringify(sender)
      })
      .then(response => response.json())
      .then(response => setTimeout(()=>{window.location.href = "/Login"}, 500))
      .catch(console.error)
    }}, 200)

  }

  render(){
    return(
      <div id="login-container">
        <h2>Welcome...</h2>
        <form id="register-box" onSubmit={this.register}>
          <h3>Register A New User</h3>
          <label htmlFor="register-first-name">First Name: </label>
          <input type="text" id="register-first-name" onChange={this.changeFn} value={this.state.firstname} />

          <label htmlFor="register-last-name">Last Name: </label>
          <input type="text" id="register-last-name" onChange={this.changeLn} value={this.state.lastname}/>

          <label htmlFor="register-newt-name">User Name: </label>
          <input type="text" id="register-newt-name" onChange={this.changeUn} value={this.state.name}/>

          <p id="exists-warning" className="hidden">Username already exists...</p>

          <label htmlFor="avatarChoice">Select an avatar: </label>
          <div id="avatarChoice">
            <label>
              <input type="radio" id="avatarChoice1" name="avatar"  onChange={this.changeAv} value="1"/>
              <img className="avatar-needs" src="./astronaut.png" alt="astronaut avatar" />
            </label>

            <label>
              <input type="radio" id="avatarChoice2" name="avatar" onChange={this.changeAv} value="2"/>
              <img className="avatar-needs" src="./dog.png" alt="dog astronaut avatar"/>
            </label>

            <label>
              <input type="radio" id="avatarChoice3" name="avatar" onChange={this.changeAv} value="3"/>
              <img className="avatar-needs" src="./alien.png" alt="alien avatar"/>
            </label>

            <label>
              <input type="radio" id="avatarChoice4" name="avatar" onChange={this.changeAv} value="4"/>
              <img className="avatar-needs" src="./robot.png" alt="robot avatar"/>
            </label>
          </div>

          <label htmlFor="form-password">Password: </label>
          <input type="password" id="form-password" onChange={this.changePw}/>

          <label htmlFor="form-password-confirm">Confirm Password: </label>
          <input type="password" id="form-password-confirm" onChange={this.changeP2} value={this.state.passTwo} />
          <p id="mismatch-warning" className="hidden">Your passwords do not match...</p>

          <button id="login-submitter" type="submit" >Register!</button>
        </form>
      </div>
    )
  }
}

export default CreateUser

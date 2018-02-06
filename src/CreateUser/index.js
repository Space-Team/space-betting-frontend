import React from "react"
import "./style.css"

const apiUrl = "https://planet-wager.herokuapp.com/users"

class CreateUser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      unique: true,
      match: false
    }
    this.register = this.register.bind(this)
    this.checkName = this.checkName.bind(this)
    this.checkPass = this.checkPass.bind(this)
  }

  checkName(input){
    this.setState({unique: true})
    if (this.props.users.length < 1){
      console.log("users not here yet")
      return
    }
    this.props.users.forEach(user => {
      if (user.name === input){
        this.setState({unique: false})
      }
    })
  }

  checkPass(pass, conf){
    this.setState({match: false})
    if (pass === conf){
      this.setState({match: true})
    }
  }

  register(e){
    e.preventDefault()
    var form = new FormData(e.target)
    var sender = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      name: form.get("userName"),
      image: form.get("avatar"),
      spacebucks: 100,
      password: form.get("password")
    }

    this.checkName(sender.name)
    this.checkPass(sender.password, form.get("passwordConfirm"))
    console.log("first click!")
    setTimeout(()=>{
    if (this.state.unique && this.state.match){
      console.log("post time!")
      fetch(apiUrl, {
        method: "POST",
        headers: new Headers({
          "Content-type": "application/json"
        }),
        body: JSON.stringify(sender)
      })
      .then(response => console.log(response))
      .setTimeout(()=>{})
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
          <input type="text" id="register-first-name" name="firstName" />

          <label htmlFor="register-last-name">Last Name: </label>
          <input type="text" id="register-last-name" name="lastName" />

          <label htmlFor="register-user-name">Choose a Username: </label>
          <input type="text" id="register-user-name" name="userName" />

          <label htmlFor="avatarChoice">Select an avatar: </label>
          <div id="avatarChoice">
            <label>
              <input type="radio" id="avatarChoice1" name="avatar" value="1"/>
              <img src="https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_man-256.png" />
            </label>

            <label>
              <input type="radio" id="avatarChoice2" name="avatar" value="2"/>
              <img src="https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_woman-256.png" />
            </label>

            <label>
              <input type="radio" id="avatarChoice3" name="avatar" value="3"/>
              <img src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-256.png" />
            </label>

            <label>
              <input type="radio" id="avatarChoice4" name="avatar" value="4"/>
              <img src="https://cdn0.iconfinder.com/data/icons/everything-icons-vol-1/512/Earth-terra_nova-planet-space-world-globe-space-01-256.png" />
            </label>
          </div>

          <label htmlFor="form-password">Password: </label>
          <input type="password" id="form-password" name="password" />

          <label htmlFor="form-password-confirm">Confirm Password: </label>
          <input type="password" id="form-password-confirm" name="passwordConfirm" />

          <button id="login-submitter" type="submit" >Register!</button>
        </form>
      </div>
    )
  }
}

export default CreateUser

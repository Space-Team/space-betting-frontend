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

  render(){
    return(
      <div id="login-container">
        
      </div>
    )
  }
}

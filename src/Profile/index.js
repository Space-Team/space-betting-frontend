import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import CurrBetCard from '../CurrentBets'


let creatorName = ''

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    console.log("profile mounted")
    console.log('currentUser', this.currentUser)
    console.log('profileprops', this.props)
  }

  render() {


    return (
      <div>
        <h1>{window.sessionStorage.user}</h1>
        <p>Spacebucks:</p>
        <div id='spacebucksdiv'>
          <h2>{window.sessionStorage.spacebucks}</h2>
        </div>
        <CurrBetCard bets={this.props.bets}/>
      </div>
    );
  }
}

export default Profile;

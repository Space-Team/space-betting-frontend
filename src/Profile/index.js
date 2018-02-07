import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import CurrBetCard from '../CurrentBets'


let creatorName = ''

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bets: this.props.bets,
      currentBets: null
    }
  }

  componentDidMount() {
    console.log("profile mounted")
    console.log('profileprops', this.props)
    if(!this.props.bets) {
      console.error('super sorry')
      return null
    }
  }



  render() {
    let currentBets = this.props.bets.filter(bet => {
        return window.sessionStorage.id == bet.creator || window.sessionStorage.id == bet.acceptor})
    this.state.currentBets = currentBets
    console.log('cb', this.state.currentBets)

    return (
      <div>
        <h1>{window.sessionStorage.user}</h1>
        <p>Spacebucks:</p>
        <div id='spacebucksdiv'>
          <h2>{window.sessionStorage.spacebucks}</h2>
        </div>
        <CurrBetCard currentBets={this.state.currentBets} users={this.props.users} bets={this.state.bets}/>
      </div>
    );
  }
}

export default Profile;

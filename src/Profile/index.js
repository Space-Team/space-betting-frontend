import React, { Component } from 'react'
import CurrBetCard from '../CurrentBets'
import "./style.css";
import { Icon } from 'antd'

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      bets: this.props.bets,
      currentBets: null
    }
    this.getSpacebucks = this.getSpacebucks.bind(this)
  }

  componentDidMount() {
    if(!this.props.bets) {
      console.error('super sorry')
      return null
    }
  }

  getSpacebucks(){
    let sbs = 0
    this.props.users.forEach(user => {
      if (Number(window.sessionStorage.id) === user.id){
        sbs = user.spacebucks
      }
    })
    return sbs
  }

  render() {

    let currentBets = this.props.bets.filter(bet => {
        return Number(window.sessionStorage.id) === bet.creator || Number(window.sessionStorage.id) === bet.acceptor})
        // eslint-disable-next-line
    this.state.currentBets = currentBets

    let sbs = this.getSpacebucks()

    return (

        <div>
        <div id="profile-username-title">
          <h2 id="scap">Space Captain</h2>
          <h2 id="captainUser">{window.sessionStorage.user}</h2>
        </div>
        <div className='spacebucks'>
          <p className='sbucksLabel' >Spacebucks:</p>
          <h2 id='spacebucksdiv'>{sbs} <Icon type="rocket" /></h2>
        </div>
        <CurrBetCard getSB={this.getSpacebucks} getBets={this.props.getBets} currentBets={this.state.currentBets} users={this.props.users} getUsers={this.props.getUsers} bets={this.state.bets} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

export default Profile;

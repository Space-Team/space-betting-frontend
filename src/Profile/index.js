import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import CurrBetCard from '../CurrentBets'
import "./style.css";
import { Icon } from 'antd'


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

  getSpacebucks(){
    var sbs = 0
    this.props.users.forEach(user => {
      if (window.sessionStorage.id == user.id){
        sbs = user.spacebucks
      }
    })
    return sbs
  }

  render() {
    let currentBets = this.props.bets.filter(bet => {
        return window.sessionStorage.id == bet.creator || window.sessionStorage.id == bet.acceptor})
    this.state.currentBets = currentBets

    return (
      <div >
        <h2>Space Captain {window.sessionStorage.user}</h2>
        <div className='spacebucks'>
          <p className='sbucksLabel' >Spacebucks:</p>
          <h2 id='spacebucksdiv'>{this.getSpacebucks()} <Icon type="rocket" /></h2>
        </div>
        <CurrBetCard currentBets={this.state.currentBets} users={this.props.users} bets={this.state.bets} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

export default Profile;

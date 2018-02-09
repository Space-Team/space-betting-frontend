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
        return window.sessionStorage.id == bet.creator || window.sessionStorage.id == bet.acceptor})
    this.state.currentBets = currentBets

    let sbs = this.getSpacebucks()

    return (
      <div >
        <h2>Space Captain {window.sessionStorage.user}</h2>
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

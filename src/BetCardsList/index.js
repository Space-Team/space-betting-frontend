import React, { Component } from 'react'
import BetCard from '../BetCard'

class BetCardsList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.forceUpdate()
  }
  render() {
    let cardRender = null;

    if (!this.props.bets) {
      cardRender = <p>No data yet, hold please</p>
    } else if (this.props.bets) {
      cardRender = this.props.creatorBets.map(bet => {
        if (bet.accepted === false) {
          return <BetCard key={bet.id}
          bet={bet}
          users={this.props.users}
          putAcceptance={this.props.putAcceptance}
          getBets={this.props.getBets}
          getUsers={this.props.getUsers}
          currentUser={this.props.currentUser}/>
        }
      })
    }
    return(
      <div>
        { cardRender }
      </div>
    )
  }
}




export default BetCardsList;

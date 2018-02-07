import React, { Component } from 'react'
import BetCard from '../BetCard'

const BetCardsList = (props) => {

  if (!props.bets) {
    return <p>No data yet, hold please</p>
  } else if (props.bets) {

  }

  return props.creatorBets.map(bet => {
    if (bet.accepted === false) {
      return <BetCard key={bet.id}
      bet={bet}
      users={props.users}
      putAcceptance={props.putAcceptance}
      getBets={props.getBets}/>
    }
  })

}


export default BetCardsList;

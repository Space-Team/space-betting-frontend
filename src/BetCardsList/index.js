import React, { Component } from 'react'
import BetCard from '../BetCard'

const BetCardsList = (props) => {

  if (!props.bets) {
    return <p>No data yet, hold please</p>
  } else if (props.bets) {
    console.log('props.bets', props.bets)
  }

    return props.bets.map(bet => {
      return <BetCard key={bet.id} bet={bet}/>
    })

}


export default BetCardsList;
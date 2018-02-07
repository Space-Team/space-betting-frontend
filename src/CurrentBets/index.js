import React from 'react'



const CurrBetCard = props => {

  let currentBets = props.bets.filter(bet => {
      return window.sessionStorage.id == bet.creator})
    console.log('cb', currentBets)

  console.log('eprops', props)
  // return this.currentBets.map(bet => {
    return (
      <div key={1}>
        <p>hi</p>
      </div>
    )



}

export default CurrBetCard;

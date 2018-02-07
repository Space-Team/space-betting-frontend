import React, { Component } from 'react'
import "./style.css"
import { Button } from 'antd'



class CurrBetCard extends Component {

  constructor(props){
    super(props)
  }


  componentDidMount() {
    console.log('eprops', this.props)
  }



  render () {

  return this.props.currentBets.map(bet => {
    let creatorName = this.props.users.filter(item => {
        return bet.creator === item.id
      })
    return (
      <div className='currbets' key={bet.id}>
        <p>Created by: {bet.creator}</p>
        <p>Description: {bet.description}</p>
        <p>Accepted by: {bet.acceptor}</p>
        <Button>Creator Won</Button>
        <Button>Acceptor Won</Button>
        <Button>Wash</Button>
      </div>
    )
  })

  }
}

export default CurrBetCard;

import React from "react"
import { Button, Icon } from "antd"

class CreatorList extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){

    return this.props.currentBets.sort((a, b) => {
        return (b.date) - (a.date);
        // eslint-disable-next-line
      }).map(bet => {
      if(bet.creator === Number(window.sessionStorage.id)){
        return(
          <div className="currbets" key={bet.id}>
            <p className="betcardtext gridcol1">Creator: <span className="strong">{window.sessionStorage.user}</span></p>
            <p className="betcardtext gridcol2">Acceptor: <span className="strong">{this.props.idToName(bet.acceptor) || "No one has accepted this bet yet"}</span></p>
            <p className="betcardtext gridcolspan">The Bet: <span className="strong">{bet.description}</span></p>
            <p className={bet.resolved ? "betcardtext winner gridcolspan" : "betcardtext winner hidden"}>{this.props.idToName(bet.winner)} won the bet!</p>
            <p className={bet.paid && bet.winner === Number(window.sessionStorage.id) ? "betcardtext" : "betcardtext hidden"}>Spacebucks Deposited!</p>
            <div className={bet.accepted ? "gridcolspan btns" : "hidden"}>
              <Button className={bet.resolved ? "currentBetsBtns hidden" : "currentBetsBtns"} type='primary' onClick={(e)=>{this.props.iWon(e, bet)}}>I Won</Button>
              <Button className={bet.resolved ? "currentBetsBtns hidden" : "currentBetsBtns"} type='danger' onClick={(e)=>{this.props.theyWon(e, bet)}}>I Lost</Button>
              <Button className={bet.resolved ? "currentBetsBtns hidden" : "currentBetsBtns"} type='primary' onClick={(e)=>{this.props.washOut(e, bet)}}>Wash</Button>
            </div>
            <Button className={bet.resolved && !bet.paid && bet.winner === Number(window.sessionStorage.id) ? "currentBetsBtns gridcolspan" : "hidden"} type="primary" onClick={(e)=>{this.props.collect(e, bet, bet.amount * 2)}}>Collect {bet.amount * 2} Spacebucks</Button>
            <Button className={bet.resolved && !bet.paid && bet.winner === 1 ? "currentBetsBtns gridcolspan" : "hidden"} type="primary" onClick={(e)=>{this.props.collect(e, bet, bet.amount)}}>Collect {bet.amount} Spacebucks</Button>
            <p className="betcardtext amount">Amount: {bet.amount} <Icon type="rocket" /></p>
          </div>
        )
      }
    })
  }
}

export default CreatorList

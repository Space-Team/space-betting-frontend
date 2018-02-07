import React, { Component } from "react"
import { Button } from "antd"
import BetCardsList from "../BetCardsList"
import PostBet from "../PostBet"
import "./style.css"

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      betsToggle: false
    }
    this.toggleForm = this.toggleForm.bind(this)
  }

  toggleForm(e){
    e.preventDefault()
    if(window.sessionStorage.length === 0){
      window.location.href = "/login"
    } else {
      this.setState({betsToggle: !this.state.betsToggle})
    }
  }

  render () {

    return (
        <div className="MainPage">
          <div className="place-bets-box">
            <Button id="post-button" className={this.state.betsToggle ? "navbtn hidden" : "navbtn"} onClick={this.toggleForm} size="large"> Create A Bet </Button>
            <PostBet id="post-bet-box" submitBet={this.props.submitBet} toggle={this.state.betsToggle} toggler={this.toggleForm}/>
          </div>
          <h2>Available Bets</h2>
          <div className="cardHeaders">
            <p>Amount</p>
            <p className="cardname">Description</p>
            <p>Creator</p>
          </div>
          <BetCardsList currentUser={this.props.currentUser}
            users={this.props.users}
            bets={this.props.bets}
            putAcceptance={this.props.putAcceptance} 
            creatorBets={this.props.creatorBets}
            getBets={this.props.getBets}/>
        </div>
    )
  }
}

export default Main;

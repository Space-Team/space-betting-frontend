import React, { Component } from "react"
import BetCardsList from "../BetCardsList"
import PostBet from "../PostBet"

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render () {

    return (
        <div className="MainPage">
          <h2>Available Bets</h2>
          <div className="cardHeaders">
            <p>Amount</p>
            <p className="cardname">Description</p>
            <p>Creator</p>
          </div>
          <BetCardsList users={this.props.users} bets={this.props.bets} creatorBets={this.props.creatorBets}/>
          <PostBet />
        </div>
    )
  }
}

export default Main;

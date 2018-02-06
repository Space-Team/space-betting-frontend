import React, { Component } from 'react';

let creatorName = ''

class BetCard extends Component {

  constructor(props) {
  super(props)

  }

  componentDidMount() {
    console.log("mounted")
    console.log("creatorName")
    creatorName = this.props.users.filter(item => {
        return this.props.bet.creator === item.id
      })
  }




  render() {

    return (
      <div className="betcard">
        <main className="maincard">
          <p>{this.props.bet.amount}</p>
          <p className="cardname">{this.props.bet.description}</p>
          <p>{this.props.bet.creator}</p>
        </main>

      </div>
    );
  }
}

export default BetCard;

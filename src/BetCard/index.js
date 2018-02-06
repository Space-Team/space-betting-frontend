import React, { Component } from 'react';

let creatorName = ''

class BetCard extends Component {

  constructor(props) {
  super(props)

  }

  componentDidMount() {
    console.log("mounted")
    console.log("creatorName")
    console.log('props1', this.props)
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
          <p>{this.props.bet.name}</p>
          <button>Accept</button>
        </main>

      </div>
    );
  }
}

export default BetCard;

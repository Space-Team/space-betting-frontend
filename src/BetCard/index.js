import React, { Component } from 'react';


class BetCard extends Component {

  constructor(props) {
  super(props);
  }

  componentDidMount() {
    console.log('this.props.bet', this.props.bet)
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

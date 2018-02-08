import React, { Component } from "react";
import "./style.css";
import { Button } from "antd";

class CurrBetCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var acceptor = "";

		return this.props.currentBets.map(bet => {
			return this.props.users.map(user => {
				if (bet.acceptor === user.id) {
					acceptor = user.name;
				}

				if (bet.creator === user.id) {
					return (
						<div className="currbets" key={bet.id}>
							<p>Created by: {user.name}</p>
							<p>Description: {bet.description}</p>
							<p>Accepted by: {acceptor}</p>
							<Button className='currentBetsBtns' type='primary'>Creator Won</Button>
							<Button className='currentBetsBtns' type='primary'>Acceptor Won</Button>
							<Button className='currentBetsBtns' type='primary'>Wash</Button>
						</div>
					);
				}
			});
		});
	}
}

export default CurrBetCard;

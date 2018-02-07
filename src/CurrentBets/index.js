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
							<Button>Creator Won</Button>
							<Button>Acceptor Won</Button>
							<Button>Wash</Button>
						</div>
					);
				}
			});
		});
	}
}

export default CurrBetCard;

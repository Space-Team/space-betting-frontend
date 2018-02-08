import React, { Component } from "react";
import "./style.css";
import { Button } from "antd";

class CurrBetCard extends Component {
	constructor(props) {
		super(props);
		this.idToName = this.idToName.bind(this)
	}

	idToName(id){
		if(this.props.users.length < 1){
			return <p>Waiting on data</p>
		}

		var name
		this.props.users.forEach(user => {
			if (user.id === id){
				name = user.name
			}
		})
		return name
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
							<p className={bet.resolved ? "" : "hidden"}>{this.idToName(bet.winner)} won the bet!</p>
							<Button>I Won</Button>
							<Button>They Won</Button>
							<Button>Wash</Button>
						</div>
					);
				}
			});
		});
	}
}

export default CurrBetCard;

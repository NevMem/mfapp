import React, { Component } from 'react'

class Ticket extends Component {
	sum(x){
		let ans = 0
		while (x > 0) {
			ans += x % 10
			x = x / 10 | 0
		}
		return ans
	}
	isLucky(){
		let number = parseInt(this.props.number, 10)
		return this.sum(number / 1000 | 0) === this.sum(number % 1000)
	}

	render(){
		let clssName = this.isLucky() ? "ticket lucky" : "ticket"
		return (
			<div className = {clssName} onClick = {this.props.onTicketClicked.bind(this)}>
            	<div>Минтранс</div>
            	<div>{this.props.number}</div>
            	<div>Автобус</div>
            	<div>{this.props.name}</div>
          	</div>
		)
	}
}

export default Ticket
import React, { Component } from 'react'

class Ticket extends Component {
	render(){
		return (
			<div className = 'ticket' onClick = {this.props.onTicketClicked.bind(this)}>
            	<div>Минтранс</div>
            	<div>{this.props.number}</div>
            	<div>Автобус</div>
            	<div>{this.props.name}</div>
          	</div>
		)
	}
}

export default Ticket
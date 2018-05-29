import React, { Component } from 'react'

class Header extends Component {
	render(){
		return (
			<div id = 'header'>
				<div className = 'container row'>
					<h1>Bus ticket tracker</h1>
					{this.props.items.map((el, index) => {
						return <a href = {el.link} key = {index}>{el.label}</a>
					})}
				</div>
			</div>
		)
	}
}

export default Header
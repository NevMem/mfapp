import React, { Component } from 'react'
import { Link } from 'react-router-dom' 

class Header extends Component {
	render(){
		return (
			<div id = 'header'>
				<div className = 'container row'>
					<h1>Bus ticket tracker</h1>
					{this.props.items.map((el, index) => {
						return <Link to = {el.link} key = {index}>{el.label}</Link>
					})}
				</div>
			</div>
		)
	}
}

export default Header
import React, { Component } from 'react'
import closeIcon from '../close.svg'

class Modal extends Component {
	render(){
		if(!this.props.show)
			return null
		return (
			<div className = 'ModalBack'>
				<div className = 'Modal'>
					<div className = 'modalHeading'>
						<h1>{this.props.header}</h1>
						<img className = 'closeButton' alt = 'close' src = {closeIcon} />
					</div>
					<form>
						<input type = 'text' value = {this.props.input} />
					</form>
				</div>
			</div>
		)
	}
}

export default Modal
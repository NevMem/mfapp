import React, { Component } from 'react'
import closeIcon from '../close.svg'

class Modal extends Component {
	constructor(props){
		super(props)
		this.state = {
			value: ''
		}
	}

	onChange(ev){
		this.setState({ value: ev.target.value })
	}

	render(){
		if(!this.props.show)
			return null
		return (
			<div className = 'ModalBack'>
				<div className = 'Modal'>
					<div className = 'modalHeading'>
						<h1>{this.props.header}</h1>
						<img className = 'closeButton' alt = 'close' src = {closeIcon} onClick = { this.props.close } />
					</div>
					<form>
						<h2>Previous ticket number: {this.props.input}</h2>
						<input type = 'text' value = {this.state.value} onChange = {this.onChange.bind(this)} placeholder = 'Enter new ticket number' />
						<div className = 'row'>
							<button className = 'btn' onClick = { e => e.preventDefault() }>CHANGE</button>
							<button className = 'btn btn-danger' onClick = { e => e.preventDefault() }>DELETE</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Modal
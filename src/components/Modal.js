import React, { Component } from 'react'
import closeIcon from '../close.svg'
import { connect } from 'react-redux'

class Modal extends Component {
	constructor(props){
		super(props)
		this.state = {
			prevValue: this.props.number, 
			value: this.props.number, 
			id: this.props.id, 
			errors: '', 
			message: ''
		}
	}

	onChange(ev){
		this.setState({ value: ev.target.value })
	}

	changeButtonClick(ev){
		ev.preventDefault()
		this.setState({ errors: '', message: '' })
		this.props.changeTicketNumber(this.state.id, this.state.value)
			.then(res => {
				res = res.data
				if(res.err){
					this.setState({errors: res.err})
					return
				}
				this.props.dispatch({ type: 'CHANGE', payload: { id: this.state.id, number: this.state.value } })
				this.setState({ message: 'Changed' })
			})
	}

	deleteButtonClick(ev){
		ev.preventDefault()
		this.setState({ errors: '', message: '' })
		this.props.deleteTicket(this.state.id)
			.then(res => {
				res = res.data
				if(res.err){
					this.setState({ errors: res.err })
					return
				}
				this.props.dispatch({ type: 'DELETE', payload: { id: this.state.id } })
				this.setState({ message: 'Deleted' })
			})
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
						<h2>Previous ticket number: {this.state.prevValue}</h2>
						<h3>Ticket id: {this.state.id}</h3>
						{this.state.errors && <h4 className = 'error'>{this.state.errors}</h4>}
						{this.state.message && <h4 className = 'success'>{this.state.message}</h4>}
						<input type = 'text' value = {this.state.value} onChange = {this.onChange.bind(this)} placeholder = 'Enter new ticket number' />
						<div className = 'row'>
							<button className = 'btn' onClick = {this.changeButtonClick.bind(this)}>CHANGE</button>
							<button className = 'btn btn-danger' onClick = {this.deleteButtonClick.bind(this)}>DELETE</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return state
}

export default connect(mapStateToProps)(Modal)
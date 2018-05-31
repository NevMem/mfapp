import React, { Component } from 'react'
import api from '../api.js'

class LoginForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			loginTab: false, 
			formName: '', 
		    formEmail: '', 
		    formLogin: '', 
		    formPassword: '',
		    lastMessage: ''
		}
	}

	handleChange(event){
    	let name = event.target.id
    	this.setState({ [name]: event.target.value })
    }

    loginButtonClick(event){
		event.preventDefault()
		if(this.state.loginTab){
			this.setState({ lastMessage: '' })
			api.login(this.state.formLogin, this.state.formPassword)
				.then(data => {
					if(data.err){
						this.setState({ lastMessage: data.message })
					} else {
						let user = data.user
						this.props.loggedIn(user.token, user.name, user.email)
					}
				})
				.catch(err => {
					this.setState({ lastMessage: err })
				})
		} else {
			this.setState({ loginTab: !this.state.loginTab })
		}
	}

	signUpButtonClick(event){
		event.preventDefault()
		if(!this.state.loginTab){
			api.register(this.state.formLogin, this.state.formPassword, this.state.formName, this.state.formEmail)
				.then(data => {
					if(data.err){
						this.setState({ lastMessage: data.message })
					} else {
						this.props.loggedIn(data.user.token, data.user.name, data.user.name)
					}
				})
		} else {
			this.setState({ loginTab: !this.state.loginTab })
		}
	}

	render(){
		if(!this.state.loginTab) return (
			<form className = 'signup-form'>
		        <h1>Login or sign up</h1>
		        {this.state.lastMessage && (<h3 style = {{ color: '#E4572E' }}>{this.state.lastMessage}</h3>)}
		        <input type = 'text' id = 'formName' value = {this.state.formName} onChange = {this.handleChange.bind(this)} placeholder = 'Name' />
		        <input type = 'email' id = 'formEmail' value = {this.state.formEmail} onChange = {this.handleChange.bind(this)} placeholder = 'E-mail' />
		        <input type = 'text' id = 'formLogin' value = {this.state.formLogin} onChange = {this.handleChange.bind(this)} placeholder = 'Login' />
		        <input type = 'password' id = 'formPassword' value = {this.state.formPassword} onChange = {this.handleChange.bind(this)} placeholder = 'Password' /> 
		        <div className = 'row'>
		          <button className = 'btn login' onClick = {this.loginButtonClick.bind(this)}>LOGIN</button>
		          <button className = 'btn signup' onClick = {this.signUpButtonClick.bind(this)}>SIGN UP</button>
		        </div>
  			</form>
     	) 
		else return (
     		<form className = 'login-form'>
     			<div>
     			    <h1 style = {{ marginTop: '19px' }}>Login or sign up</h1>
     			    <h3 style = {{ color: '#E4572E' }}>{this.state.lastMessage}</h3>
			        <input type = 'text' id = 'formLogin' value = {this.state.formLogin} onChange = {this.handleChange.bind(this)} placeholder = 'Login' />
			        <input type = 'password' id = 'formPassword' value = {this.state.formPassword} onChange = {this.handleChange.bind(this)} placeholder = 'Password' /> 
			        <div className = 'row' style = {{ 'marginTop': '10px' }}>
			          <button className = 'btn login' onClick = {this.loginButtonClick.bind(this)}>LOGIN</button>
			          <button className = 'btn signup' onClick = {this.signUpButtonClick.bind(this)}>SIGN UP</button>
			        </div>
		        </div>
  			</form>
     	)
	}	
}

export default LoginForm
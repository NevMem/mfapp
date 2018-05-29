import React, { Component } from 'react'
import axios from 'axios'

class LoginForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			loginTab: true, 
			formName: 'NevMem', 
		    formEmail: 'not', 
		    formLogin: 'mfls', 
		    formPassword: 'lsmls',
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
			axios.post('/login', { login: this.state.formLogin, password: this.state.formPassword }).then((res) => {
				res = res.data
				if(res.err){
					this.setState({ lastMessage: res.message })
				} else {
					res = res.user
					this.props.loggedIn(res.token, res.name, res.email)
				}
			})
		} else {
			this.setState({ loginTab: !this.state.loginTab })
		}
	}

	signUpButtonClick(event){
		event.preventDefault()
		if(!this.state.loginTab){
			axios.post('/register', { login: this.state.formLogin, name: this.state.formName, email: this.state.formEmail, password: this.state.formPassword }).then((res) => {
				res = res.data
				if(res.err){
					alert(res.message)
				} else {
					res = res.user
					this.props.loggedIn(res.token, res.name, res.email)
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
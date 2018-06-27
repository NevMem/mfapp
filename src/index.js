import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'

const initialState = {
	tickets: [], 
	name: '', 
	email: ''
}

function reducer(state = initialState, action){
	switch(action.type){
		case 'ADD_FRONT': {
			state = { ...state, tickets: [ { id: action.payload._id, number: action.payload.number, owner: action.payload.owner }, ...state.tickets ] }
			return state
		}
		case 'ADD_BACK': {
			state = { ...state, tickets: [ ...state.tickets, { id: action.payload._id, number: action.payload.number, owner: action.payload.owner } ] }
			return state
		}
		case 'DELETE': {
			state = { ...state, tickets: state.tickets.filter(ticket => ticket.id !== action.payload.id) }
			return state
		}
		case 'CHANGE': {
			return { ...state, tickets: state.tickets.map(ticket => {
				if (ticket.id === action.payload.id)
					ticket.number = action.payload.number
				return ticket
			}) }
		}
		case 'LOGGED_IN': {
			state = { ...state, name: action.payload.name, email: action.payload.email, token: action.payload.token }
			return state
		}
		case 'LOGOUT': {
			state = { ...state, name: '', email: '', token: '' }
			return state
		}
		default: {
			return state	
		}
	}
}

const store = createStore(reducer)

if(localStorage.token){
	store.dispatch({ type: 'LOGGED_IN', payload: { token: localStorage.token, name: localStorage.name, email: localStorage.email } })
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store = {store}>
			<Route component = {App} />
		</Provider>
	</BrowserRouter>	
	, 
	document.getElementById('root')
	)
registerServiceWorker();

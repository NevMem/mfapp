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
	email: '', 
	count: 0
}

function reducer(state = initialState, action){
	switch(action.type){
		case 'ADD': {
			state = { ...state, tickets: [...state.tickets, { id: action.payload.id, number: action.payload.number, name: action.payload.name } ] }
			if(state.name && action.payload.name === state.name)
				state.count += 1
			return state
		}
		case 'LOGGED_IN': {
			state = { ...state, name: action.payload.name, email: action.payload.email, token: action.payload.token }
			state.count = 0
			for (let ticket of state.tickets)
				if (ticket.name === action.payload.name)
					state.count += 1
			return state
		}
		case 'LOGOUT': {
			state = { ...state, name: '', email: '', token: '' }
			return state
		}
		default: return state
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

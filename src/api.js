import axios from 'axios'

export default {
	addTicket: (number, name, token) => {
		return axios.post('/api/addTicket', { number: number, name: name, token: token }).then(res => res)
	}, 
	
	changeTicketNumber: (id, number, token) => axios.post('/api/changeTicketNumber', { id: id, number: number, token: token }), 
	
	deleteTicket: (id, token) => axios.post('/api/deleteTicket', { id: id, token: token }), 
	
	login: (login, password) => axios.post('/api/login', { login: login, password: password }).then(res => {
		console.log('here')
		return res.data
	}).catch(msg => {
		return msg.response.data
	}), 

	register: ( login, password, name, email ) => axios.post('/api/register', { login: login, password: password, name: name, email: email })
		.then(res => res.data)
		.catch(res => res.response.data)
} 
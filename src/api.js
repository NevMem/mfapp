import axios from 'axios'

export default {
	addTicket: (number, name, token) => {
		return axios.post('/api/addTicket', { number: number, name: name, token: token }).then(res => res)
	}, 
	changeTicketNumber: (id, number, token) => axios.post('/api/changeTicketNumber', { id: id, number: number, token: token }), 
	deleteTicket: (id, token) => axios.post('/api/deleteTicket', { id: id, token: token })
} 
import axios from 'axios'

export default {
	addTicket: (number, name, token) => {
		return axios.post('/addTicket', { number: number, name: name, token: token }).then(res => res)
	}, 
	changeTicketNumber: (id, number, token) => axios.post('/changeTicketNumber', { id: id, number: number, token: token })
} 
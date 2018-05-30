import React, { Component } from 'react'
import Header from './Header.js'
import '../style.css'
import { connect } from 'react-redux'
import axios from 'axios'
import LoginForm from './LoginForm.js'
import api from '../api'
import Ticket from './Ticket'
import Modal from './Modal'

const menu = [
  {
    link: '/', 
    label: 'Main Page'
  }, 
  {
    link: '/contacts', 
    label: 'Contacts'
  }, 
  {
    link: '/blog', 
    label: 'Blog'
  }
]

class MainPage extends Component {
  constructor(prps){
    super(prps)
    this.state = {
      newticket: '',  
      lastId: -1, 
      modalShow: false, 
      modalHeader: 'Modify ticket', 
      modalNumber: '', 
      modalId: ''
    }
  }

  reload(){
    axios.post('/api/tickets', { lastId: this.state.lastId }).then((res) => {
      let data = res.data
      if(data.length !== 0){
        let newLastId = Math.max(data[0].id, data[data.length - 1].id)
        for (let ticket of data)
          this.props.dispatch({ type: 'ADD', payload: ticket })
        this.setState({ lastId: newLastId })
      }

      this.registerReloader()
    })
  }

  registerReloader(){
    setTimeout(this.reload.bind(this), 500)
  }

  componentDidMount(){
    this.reload()
  }

  addTicketButtonClicked(){
    let ticketNumber = this.state.newticket
    api.addTicket(ticketNumber, this.props.name, this.props.token).then(msg => {
      msg = msg.data
      if(msg.err){
        alert(msg.err)
      } else {
        this.setState({ 'newticket': '' })
      }
    })
  }

  onTicketClicked(number, id){
    this.setState({ modalShow: true, modalNumber: number, modalId: id })
  }

  logout(){
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.props.dispatch({ type: 'LOGOUT', payload: {} })
  }
  
  handleChange(event){
    let name = event.target.id
    this.setState({ [name]: event.target.value })
  }

  loggedIn(token, name, email){
    localStorage.token = token
    localStorage.name = name
    localStorage.email = email
    this.props.dispatch({ type: 'LOGGED_IN', payload: { token: token, name: name, email: email } })
  }

  changeTicketNumber = (id, number) => api.changeTicketNumber(id, number, this.props.token).then(res => {
    return res
  })

  render(){
    return(
      <div id = 'wrapper'>
        { this.state.modalShow && 
          <Modal location = {this.props.location} changeTicketNumber = {this.changeTicketNumber.bind(this)} show = {this.state.modalShow} header = {this.state.modalHeader} number = {this.state.modalNumber} id = {this.state.modalId} close = { e => { this.setState({ modalShow: false }) } } /> }
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
        <Header items = {menu} />
        <div className = 'main-section'>
          <div className = 'container'>
            <div className = 'row'>
              <div className = 'left-part'>
                <h1>На этом сайте вы можете записывать номерки автобусных билетов</h1>
              </div>
              <div className = 'right-part'>
                { !this.props.name ? (
                  <LoginForm loggedIn = {this.loggedIn.bind(this)} />
                ) : (
                  <div className = 'profile'>
                    <div>
                      <div className = 'row'>
                        <h3>Name:</h3>
                        <div className = 'row'>
                          <button className = 'btn small-btn' style = {{ 'marginRight': '10px' }} onClick = {this.logout.bind(this)}>LOGOUT</button>
                          <h4>{this.props.name}</h4>
                        </div>
                      </div>
                      <div className = 'row'>
                        <h3>Email:</h3>
                        <h4>{this.props.email}</h4>
                      </div>
                      <div className = 'row'>
                        <h3>Count of tickets:</h3>
                        <h4>{this.props.count}</h4>
                      </div>
                    </div>
                    <div>
                      <h3>Add ticket</h3>
                      <div className = 'row'>
                        <input style = {{ 'width': '200px' }} type = 'text' id = 'newticket' value = {this.state.newticket} onChange = {this.handleChange.bind(this)} placeholder = 'Ticket number' />
                        <button className = 'btn' onClick = {this.addTicketButtonClicked.bind(this)}>ADD</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className = 'ticket-section'>
          <div className = 'container'>
            <h3>Последние добавленные билеты:</h3>
            <div className = 'row ticket-flow'>
              {this.props.tickets.map((el, index) => {
                return (
                  <Ticket key = {index} name = {el.name} number = {el.number} id = {el.id} onTicketClicked = {this.onTicketClicked.bind(this)} />
                  )
              })}
            </div>
          </div>
        </div>
      </div>
      )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(MainPage)
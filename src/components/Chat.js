import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import openSocket from 'socket.io-client'

class Chat extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            expanded: false, 
            name: props.name, 
            token: props.token, 
            clientMessage: '', 
            messages: [], 
            socket: openSocket(), 
            connected: false, 
            onlineUsers: 0
        }   
        this.messageArea = React.createRef()
        this.state.socket.on('chat message', (msg) => {
            console.log('chat message')
            this.setState({ messages: [ ...this.state.messages, msg ] })
        })
        this.state.socket.on('change online', (msg) => {
            console.log('online changing')
            this.setState({ onlineUsers: msg.onlineUsers })
        })
        this.state.socket.on('connect', () => {
            console.log('connected')
            this.setState({ connected: true })
        })
        this.state.socket.on('disconnect', () => {
            console.log('disconnected')
            this.setState({ connected: false })
        })
    }

    expand(){
        this.setState({ expanded: !this.state.expanded })
    }

    handleChange(event){
        this.setState({ clientMessage: event.target.value })
    }

    encrypt = text => {
        let msg = ''
        
        for(let i = 0;i < text.length;i++){
            let cur = text.charCodeAt(i)
            msg += String.fromCharCode(cur)
        }

        return msg
    }

    handleKeyPress(event){
        if(event.key === 'Enter'){
            this.state.socket.emit('client message', { name: this.state.name, token: this.state.token, message: this.encrypt(this.state.clientMessage) })
            this.setState({ clientMessage: '' })
        }
    }

    formatTime = time => {
        let date = new Date(time)
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    }

    componentWillUnmount = () => {
        console.log('chat unmounting')
        if (this.state.socket){
            console.log('closing socket')
            this.state.socket.close()
        }
        console.log('chat unmounted')
    }

    scrollToBottom(){
        if(this.state.expanded){
            let clientHeight = this.messageArea.current.clientHeight
            let scrollTop = this.messageArea.current.scrollTop
            let scrollHeight = this.messageArea.current.scrollHeight

            if (scrollTop + clientHeight >= scrollHeight - 75){
                ReactDOM.findDOMNode(this.messageArea.current).scrollTop = scrollHeight - clientHeight > 0 ? scrollHeight - clientHeight : 0
            }
        }
    }

    componentDidUpdate = () => {
        this.scrollToBottom()
    }

    render(){
        return (
            <div className = 'chat'>
                <div className = 'chat-header' onClick = {this.expand.bind(this)}>
                    <div className = 'row'>
                        <p>Chat</p>
                        {this.state.connected ? <div className = 'success'>online: {this.state.onlineUsers}</div> : <div className = 'error'>offline</div>}
                    </div>
                </div>
                {this.state.expanded && (
                    <div className = 'chat-body'>
                        <div className = 'chat-area' ref = {this.messageArea}>
                            {this.state.messages.map((el, index) => {
                                if(el.name !== this.state.name)
                                    return (
                                        <div className = 'chat-message' key = {index}>
                                            <div className = 'row'>
                                                <div className = 'chat-message-name'>{el.name}</div>
                                                <div className = 'chat-message-text'>
                                                    <span className = 'chat-message-span'>{el.text}</span>
                                                    <span className = 'chat-message-time'>{this.formatTime(el.time)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                else 
                                    return (
                                        <div className = 'chat-message' key = {index}>
                                            <div className = 'row my-message'>
                                                <div className = 'chat-message-name'>{el.name}</div>
                                                <div className = 'chat-message-text'>
                                                    <span className = 'chat-message-span'>{el.text}</span>
                                                    <span className = 'chat-message-time'>{this.formatTime(el.time)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) 
                            })}
                            {!this.state.connected && (
                                <div className = 'loader'>
                                    <div className = 'column'><div className = 'dot-top'></div><div className = 'dot-bottom'></div></div>
                                    <div className = 'column'><div className = 'dot-top'></div><div className = 'dot-bottom'></div></div>
                                    <div className = 'column'><div className = 'dot-top'></div><div className = 'dot-bottom'></div></div>
                                    <div className = 'column'><div className = 'dot-top'></div><div className = 'dot-bottom'></div></div>
                                    <div className = 'column'><div className = 'dot-top'></div><div className = 'dot-bottom'></div></div>
                                </div>
                            )}
                        </div>
                        <input placeholder = 'Type something' onChange = {this.handleChange.bind(this)} onKeyPress = {this.handleKeyPress.bind(this)} value = {this.state.clientMessage} type = 'text' className = 'chat-input' />
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state){
    return { name: state.name, token: state.token }
}

export default connect(mapStateToProps)(Chat)
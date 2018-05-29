import React, { Component } from 'react'
import Header from './Header'

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

class Blog extends Component {
	constructor(props){
		super(props)
		console.log(this.props)
	}

	render(){
		return (
			<div id = 'wrapper'>
        		<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
        		<Header items = {menu} />
        		<div className = 'main-section'>
        			<div className = 'container'>
        				<h1>This is blog</h1>
        			</div>
        		</div>
        	</div>
		)
	}
}

export default Blog
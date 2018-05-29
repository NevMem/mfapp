import React from 'react'
import './style.css'
import { Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import Blog from './components/Blog'

const App = ({ location }) => (
  <div>
    <Route location = {location} path = '/' exact component = {MainPage} />
    <Route location = {location} path = '/blog' exact component = {Blog} />
  </div>
)

export default App
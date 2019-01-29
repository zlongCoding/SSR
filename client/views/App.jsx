import React from 'react'
import { Link } from 'react-router-dom'
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <Link to="/" key="banner">首页1</Link>,
      <Link to="/detail" key="detail">detail</Link>,
      <Routes key="routes" />,
    ]
  }
}

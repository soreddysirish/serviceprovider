import React from "react"
import PropTypes from "prop-types"
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
class Home extends React.Component {
  render () {

    return (
     <div>
     <Router>
     <ul>
     <li><a href ="api/v1/users/login">Login</a></li>
     <li><a href ="api/v1/users/sign_up">Register</a></li>
     </ul>
     </Router> 
     </div>
    );
  }
}

export default Home

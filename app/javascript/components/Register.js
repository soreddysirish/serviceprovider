import React from "react"
import PropTypes from "prop-types"
import ReactdDOM from 'react-dom'
import request from 'superagent';
class Register extends React.Component {
	constructor(props){
		super(props)
		this.state  = {
			firstName: {value:'',isValid:true,message:''},
			lastName: {value:'',isValid:true,message:''},
			email: {value:'',isValid:true,message:''},
			password: {value:'',isValid:true,message:''},
			password_confirmation: {value:'',isValid:true,message:''},
			user_type: {value:'',isValid:true,message:''},
			phone_number: {value:'',isValid:true,message:''}
		}
		this.registerNewUser = this.registerNewUser.bind(this)
		this.handleChange =  this.handleChange.bind(this)
	}


	resetFormValues(){
		var state = this.state
		Object.keys(state).map(key => {
			if (state[key].hasOwnProperty('isValid')) {
				state[key].isValid = true;
				state[key].message = '';
			}
		})
		this.setState(state)
	}

	handleChange(e){
		var state = this.state
		if(e.target.name == "phone_number" && isNaN(e.target.value)){
			e.target.value = ''
			this.state.phone_number.message ="please enter numbers only"
		}
		state[e.target.name].value = e.target.value 
		this.setState(state)
	}
	registerNewUser(e){
		e.preventDefault()
		this.resetFormValues()
		if(this.isValidForm()){
			var state = this.state
			var data = {email:state.email.value,password:state.password.value,password_confirmation:state.password_confirmation.value,firstName:state.firstName.value,lastName:state.lastName.value,phone_number:state.phone_number.value,user_type:state.user_type.value}
			request
			.post('/users')
			.send({user:data}) 
			.end((err, res) => {
				debugger
			});
		}
	}


	isValidForm(){
		var state = this.state
		var email_valid = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);		
		if(!(state.firstName.value.length > 0 && state.firstName.value.match(/\d+/g) == null)){
			state.firstName.isValid = false
			state.firstName.message = "Please enter valild name"
		}

		if(!(state.phone_number.value.length == 10)){
			state.phone_number.isValid = false
			state.phone_number.message = "Please enter valild phone number"
		}
		if(!(state.lastName.value.length > 0 && state.lastName.value.match(/\d+/g) == null)){
			state.lastName.isValid = false
			state.lastName.message = "Please enter valild name"
		}

		if(!(state.email.value.length > 0 && email_valid.test(state.email.value))){
			state.email.isValid = false
			state.email.message = "Please enter valid email address"
			this.setState(state)
			return false
		}
		if(!(state.password.value.length >= 6 )){
			state.password.isValid = false
			state.password.message = "Password length minimum 6 charecters"
			this.setState(state)
			return false
		}
		if(!(state.password_confirmation.value.length >= 6 )){
			state.password_confirmation.isValid = false
			state.password_confirmation.message = "Password length minimum 6 charecters"
			this.setState(state)
			return false
		}
		if((state.password.value.length > 0 && state.password_confirmation.value.length > 0)){
			if(!(state.password.value == state.password_confirmation.value)){
				state.password_confirmation.isValid = false
				state.password_confirmation.message = "Password and confirm password not mached"
				this.setState(state)
				return false
			}
		}
		if(!(state.user_type.value.length > 0 )){
			state.user_type.isValid = false
			state.user_type.message = "Please select user type"
			this.setState(state)
			return false
		}
		return true
	}

	render () {
		var {firstName,lastName,email,password,password_confirmation,phone_number,user_type} = this.state
		return (
			<form onSubmit = {this.registerNewUser}>
			<input type='hidden' name='authenticity_token' value={window.authenticityToken} />
			<div className ="form-group">
			<label> First Name </label>
			<input type="text" value = {firstName.value}  name="firstName" onChange = {this.handleChange.bind(this)} />
			<span className="help-block">{firstName.message}</span>
			</div>
			<div className ="form-group">
			<label> Last Name </label>
			<input type="text" value = {lastName.value} name = "lastName" onChange ={this.handleChange.bind(this)} />
			<span className="help-block">{lastName.message}</span>
			</div>
			<div className ="form-group">
			<label> Email </label>
			<input type="text" value = {email.value}  name ="email" onChange = {this.handleChange.bind(this)} />
			<span className="help-block">{email.message}</span>
			</div>
			<div className ="form-group">
			<label> Password  </label>
			<input type="password" value = {password.value} name ="password" onChange = {this.handleChange.bind(this)}/>
			<span className="help-block">{password.message}</span>
			</div>
			<div className ="form-group">
			<label>Confirm password </label>
			<input type="password" value = {password_confirmation.value} name ="password_confirmation" onChange ={this.handleChange.bind(this)} />
			<span className="help-block">{password_confirmation.message}</span>
			</div>
			<div>
			<select onChange ={this.handleChange.bind(this)} name ="user_type">
			<option value=""></option>
			<option value="customer">customer</option>
			<option value="service provider">service provider</option>
			</select>
			<span className="help-block">{password_confirmation.message}</span>
			</div>
			<div>
			<label>Phone number </label>
			<input type="text" value = {phone_number.value}  name ="phone_number" onChange = {this.handleChange.bind(this)}  />
			</div>
			<button className="btn  btn-primary btn-block" value="submit">Register</button>
			</form>
			);
	}
}

export default Register


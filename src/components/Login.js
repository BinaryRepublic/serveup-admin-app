import React, { Component } from 'react';
import '../assets/css/Login.css';
import RealmHelper from '../library/RealmHelper';
import LoginController from '../library/LoginController';

class Login extends Component {
    constructor (props) {
        super(props);
        this.loginController = new LoginController(false, new RealmHelper());

        this.login = this.login.bind(this);
    }
    login () {
        let mail = document.getElementById('mailInput').value;
        let password = document.getElementById('passwordInput').value;
        if (mail && mail.length > 2 && password && password.length > 2) {
            this.loginController.requestGrant(mail, password);
        }
    }
    render () {
        return (
            <div className="loginMask">
                <input id="mailInput" className="loginTextInput" placeholder="Mail" type="text" name="mail"/>
                <input id="passwordInput" className="loginTextInput" placeholder="Password" type="password" name="password"/>
                <div className="loginButton" onClick={this.login}>Login</div>
            </div>
        );
    }
}

export default Login
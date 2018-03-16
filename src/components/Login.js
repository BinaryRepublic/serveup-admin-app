import React, { Component } from 'react';
import '../assets/css/Login.css';
import LoginController from '../library/LoginController';

class Login extends Component {
    constructor (props) {
        super(props);
        this.loginController = new LoginController();

        this.login = this.login.bind(this);
    }
    login () {
        let mail = 'henrik.engelbrink@code.berlin';//document.getElementById('mailInput').value;
        let password = 'passwort123';//document.getElementById('passwordInput').value;
        if (mail && mail.length > 2 && password && password.length > 2) {
            this.loginController.requestGrant(mail, password);
        }
        console.log(mail + ' -> ' + password);
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
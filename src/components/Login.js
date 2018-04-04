import React, { Component } from 'react';
import '../assets/css/Login.css';
import ServerConfig from '../serverConfig';

import AuthController from '../ro-webapp-helper/authentication/authController';

class Login extends Component {
    constructor (props) {
        super(props);
        this.serverCfg = new ServerConfig();
        this.authController = new AuthController(this.serverCfg.authApi, this.serverCfg.adminApi);
        this.login = this.login.bind(this);
    }
    login () {
        let mail = document.getElementById('mailInput').value;
        let password = document.getElementById('passwordInput').value;
        if (mail && mail.length > 2 && password && password.length > 2) {
            this.authController.requestGrant(mail, password).then(() => {
                window.location.reload();
            });
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

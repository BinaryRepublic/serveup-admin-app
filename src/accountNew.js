import React, { Component } from 'react';
import './assets/css/accountNew.css';

class AccountNew extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.props.switchPopup();
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var phoneNumber = document.getElementById("phonenumber").value;
        var email = document.getElementById("email").value;

        var newAccount = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email
        };
        this.props.add(newAccount);
    }

    render () {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                <h1>Neuen Account erstellen</h1>
                <form>
                    <input id="firstName" placeholder="Vorname"/>
                    <input id="lastName" placeholder="Nachname"/>
                    <input id="phonenumber" placeholder="Telefonnummer"/>
                    <input id="email" placeholder="Email-Adresse"/>
                </form>
                    <input className="submitNewAccount" type="submit" value="Erstellen" onClick={this.onClick} />
                <button className="buttonClose" onClick={this.props.switchPopup}>Abbrechen</button>
                </div>
            </div>
        );
    }
}

export default AccountNew;

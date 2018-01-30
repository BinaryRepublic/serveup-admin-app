import React, { Component } from 'react';
import './assets/css/accountTable.css';
import testdataAccounts from './accounts.json';
import AccountItem from './accountItem.js';
import AccountNew from './accountNew.js';

class AccountTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: testdataAccounts,
            showPopup: false,
        }
        this.switchPopup = this.switchPopup.bind(this);
        this.add = this.add.bind(this);
    }
    
    switchPopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

    add (newAccount) {
    var plus = this.state.accounts;
    var newAccount = newAccount;
    plus.push(newAccount);
    this.setState({accounts: plus})
    }

    render () {

        var AccountElements = [];
        for (var i = 0; i < this.state.accounts.length; i++) { 
            var account = this.state.accounts[i]
            AccountElements.push(<AccountItem key={i} index={i} switchViews={this.props.switchViews} account={account}/>); 
        }

        var popup;
        if(this.state.showPopup) {
            popup = <AccountNew switchPopup={this.switchPopup} add={this.add}/> 
        }   

        return (       
            <div className="app">
                <h1>Übersicht Accounts</h1>
                <button>Suchfunktion</button>
                <button onClick={this.switchPopup}>Neuen Account erstellen</button>
                <button>Logout</button>
                <div className="parent">   
                    {AccountElements}
                </div>
                {popup}
            </div>
        )
    }
}

export default AccountTable;

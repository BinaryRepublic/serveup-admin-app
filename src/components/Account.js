import React, { Component } from 'react';
import AccountItem from './AccountItem';
import CreateItem from './CreateItem';
import EditPopup from './EditPopup';
import EditPopupHelper from '../library/EditPopupHelper';
import '../assets/css/Account.css';

import HttpHelper from '../ro-webapp-helper/http';
import ServerConfig from '../serverConfig';

class Account extends Component {
    constructor (props) {
        super(props);
        this.serverCfg = new ServerConfig();
        this.http = new HttpHelper(this.serverCfg.adminApi, this.serverCfg.authApi);
        this.state = {
            accounts: []
        };
        const that = this;
        // load accounts
        this.httpBasePath = '/account';
        this.http.get('/accounts').then((result) => {
            let newState = that.state;
            newState.accounts = result;
            that.setState(newState);
        }).catch((err) => {
            console.log(err);
        });

        // edit helper
        this.editPopupHelper = new EditPopupHelper(this.httpBasePath, 'accounts');

        this.editAccount = this.editAccount.bind(this);
        this.editAccountClose = this.editAccountClose.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    // --- editAccount
    editAccount (accountIndex) {
        let newState = this.state;
        if (accountIndex !== undefined) {
            newState.editAccount = Object.assign({}, this.state.accounts[accountIndex]);
            let newFormData = {};
            // format form data
            for (let key in newState.editAccount) {
                let value = newState.editAccount[key];
                if (key === 'address') {
                    for (let addrKey in newState.editAccount[key]) {
                        if (addrKey !== 'id') {
                            newFormData[addrKey] = newState.editAccount[key][addrKey];
                        }
                    }
                } else {
                    newFormData[key] = value;
                }
            }
            newState.editAccount = newFormData;
        } else {
            newState.editAccount = false;
        }
        this.setState(newState);
    }
    editAccountClose () {
        let newState = this.state;
        newState.editAccount = undefined;
        this.setState(newState);
    }

    // --- item operations
    createAccount (formData) {
        const that = this;
        this.editPopupHelper.createItem(this.state, formData).then(newState => {
            that.setState(newState);
            that.editAccountClose();
        });
    }
    updateAccount (id, formData) {
        const that = this;
        this.editPopupHelper.updateItem(this.state, id, formData).then(newState => {
            that.setState(newState);
            that.editAccountClose();
        });
    }
    deleteAccount (id) {
        const that = this;
        this.editPopupHelper.deleteItem(this.state, id).then(newState => {
            that.setState(newState);
            that.editAccountClose();
        });
    }

    render () {
        var AccountElements = [];
        for (var i = 0; i < this.state.accounts.length; i++) {
            var account = this.state.accounts[i];
            AccountElements.push(<AccountItem key={i} index={i} switchViews={this.props.switchViews} account={account} editAccount={this.editAccount}/>);
        }
        var editAccount;
        if (this.state.editAccount !== undefined) {
            let formFields = ['mail', 'password', 'firstName', 'surName', 'street', 'postCode', 'city', 'country', 'phone'];
            editAccount = <EditPopup title="create/edit account" formData={this.state.editAccount} formFields={formFields} create={this.createAccount} update={this.updateAccount} delete={this.deleteAccount} close={this.editAccountClose} />;
        }

        return (
            <div className="account">
                <CreateItem click={this.editAccount.bind(this, undefined)} text="CREATE ACCOUNT"/>
                <div className="account-list">
                    {AccountElements}
                </div>
                {editAccount}
            </div>
        );
    }
}

export default Account;

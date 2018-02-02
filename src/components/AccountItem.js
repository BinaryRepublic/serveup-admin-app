import React, { Component } from 'react';
import '../assets/css/AccountItem.css';

class AccountItem extends Component {
    constructor () {
        super();
        this.switchViews = this.switchViews.bind(this);
        this.editAccount = this.editAccount.bind(this);
    }
    switchViews () {
        this.props.switchViews('Restaurant', this.props.account.id, this.props.account.firstName + ' ' + this.props.account.surName);
    }
    editAccount (e) {
        e.stopPropagation();
        this.props.editAccount(this.props.index);
    }
    render () {
        return (
            <div className="item" onClick={this.switchViews}>
                <span>
                    {this.props.account.firstName}
                    &nbsp;
                    {this.props.account.lastName}
                </span>
                <span onClick={this.editAccount}>
                    Edit
                </span>
            </div>
        )
    }
}

export default AccountItem;

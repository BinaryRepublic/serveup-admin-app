import React, { Component } from 'react';
import '../assets/css/AccountItem.css';
import Fa from '@fortawesome/react-fontawesome'

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
            <div className="list-item hover" onClick={this.switchViews}>
                <div className="list-item-text">
                    <span className="list-item-text-item">{this.props.account.firstName}</span>
                    <span className="list-item-text-item">{this.props.account.surName}</span>
                </div>
                <div className="list-item-icons">
                    <Fa className="list-item-icons-item" icon="pencil-alt" onClick={this.editAccount} />
                </div>
            </div>
        );
    }
}

export default AccountItem;

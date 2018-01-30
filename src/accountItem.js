import React, { Component } from 'react';
import './assets/css/accountItem.css';

class AccountItem extends Component {

    render () {
        return (
            <div className="item" onClick={this.props.switchViews.bind(this, this.props.account)}>
                <p>
                {this.props.account.firstName}
                &nbsp;
                {this.props.account.lastName}
                </p>
            </div>
        )
    }
}

export default AccountItem;

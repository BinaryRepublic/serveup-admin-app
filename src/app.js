import React, { Component } from 'react';
import './assets/css/app.css';
import AccountTable from './accountTable.js';
import ClickedAccount from './clickedAccount.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: undefined
        }
        this.switchViews = this.switchViews.bind(this);
    }

    switchViews (account) {
        this.setState({selectedAccount: account})
    }

    render() {
        console.log(this.state.selectedAccount);
        if(!this.state.selectedAccount) {
            return (
                <AccountTable switchViews={this.switchViews}/>
            );
        }
        else {
            return (
                <ClickedAccount account={this.state.selectedAccount} switchViews={this.switchViews}/>
            );
        }
    }
}

export default App;
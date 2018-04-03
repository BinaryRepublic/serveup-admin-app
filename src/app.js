import React, { Component } from 'react';
import Nav from './components/Nav.js';
import Account from './components/Account.js';
import Login from './components/Login.js';
import Restaurant from './components/Restaurant.js';
import Menu from './components/Menu.js';
import VoiceDevice from './components/VoiceDevice.js';
import './assets/css/App.css';
import AuthController from './ro-webapp-helper/authentication/authController';
import AuthStore from './ro-webapp-helper/authentication/authStore';

import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import freeSolid from '@fortawesome/fontawesome-free-solid';
import ServerConfig from "./serverConfig";
fontawesome.library.add(brands, freeSolid);

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            viewData: {
                Account: 1,
                Restaurant: undefined,
                Menu: undefined,
                VoiceDevice: undefined
            },
            navItems: [{
                componentName: 'Account',
                navName: 'Accounts'
            }]
        };
        this.serverCfg = new ServerConfig();
        this.authController = new AuthController(this.serverCfg.authApi, this.serverCfg.adminApi);
        this.authStore = new AuthStore();
        let accountId = this.authStore.accountId();
        if (accountId !== 'root') {
            let newState = this.state;
            newState.viewData.Restaurant = accountId;
            newState.navItems = [{
                componentName: 'Restaurant',
                navName: 'Restaurants'
            }];
        }

        this.switchViews = this.switchViews.bind(this);
        this.navigateViews = this.navigateViews.bind(this);
        this.logout = this.logout.bind(this);
    }

    switchViews (componentName, props, navName) {
        let newState = this.state;
        newState.viewData[componentName] = props;
        newState.navItems.push({
            componentName: componentName,
            navName: navName
        });
        this.setState(newState);
    }
    navigateViews (navName) {
        let newState = this.state;
        // delete from navItems
        let navItemIndex = -1;
        let componentName;
        newState.navItems.forEach((item, x) => {
            if (item.navName === navName) {
                navItemIndex = x;
                componentName = item.componentName;
            }
        });
        if (componentName) {
            newState.navItems.splice(navItemIndex + 1);
            // delete from viewData
            let deleteViewData = false;
            for (let key in newState.viewData) {
                if (deleteViewData) {
                    delete newState.viewData[key];
                }
                if (key === componentName) {
                    deleteViewData = true;
                }
            }
        }
        this.setState(newState);
    }
    logout () {
        this.authController.deleteAuthentication();
        window.location.reload();
    }

    render () {
        // prepare content
        if (this.authStore.authAvailable()) {
            let content;
            if (this.state.viewData.VoiceDevice) {
                content = <VoiceDevice voiceDeviceId={this.state.viewData.VoiceDevice.id} switchViews={this.switchViews} />;
            } else if (this.state.viewData.Menu) {
                content = <Menu menu={this.state.viewData.Menu.content} restaurantId={this.state.viewData.Menu.restaurantId} accountId={this.state.viewData.Restaurant} switchViews={this.switchViews} />;
            } else if (this.state.viewData.Restaurant) {
                content = <Restaurant accountId={this.state.viewData.Restaurant} switchViews={this.switchViews} />;
            } else {
                content = <Account switchViews={this.switchViews} />;
            }
            return (
                <div id="wrapper">
                    <Nav items={this.state.navItems} navigateViews={this.navigateViews} logout={this.logout.bind(this)} />
                    <div id="content">
                        {content}
                    </div>
                </div>
            );
        } else {
            return (
                <Login />
            );
        }
    }
}

export default App;

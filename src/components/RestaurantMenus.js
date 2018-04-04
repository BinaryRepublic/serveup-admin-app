import React, { Component } from 'react';
import RestaurantMenusItem from '../components/RestaurantMenusItem';
import CreateItem from '../components/CreateItem';
import EditPopup from './EditPopup';
import EditPopupHelper from '../library/EditPopupHelper';

import HttpHelper from '../ro-webapp-helper/http';
import ServerConfig from '../serverConfig';

class RestaurantMenus extends Component {
    constructor (props) {
        super(props);
        this.state = {
            menus: []
        };

        this.componentWillReceiveProps(props);

        this.editMenu = this.editMenu.bind(this);
        this.editMenuClose = this.editMenuClose.bind(this);
        this.createMenu = this.createMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps (props) {
        // load menus
        this.serverCfg = new ServerConfig();
        this.http = new HttpHelper(this.serverCfg.adminApi, this.serverCfg.authApi);
        this.httpPath = '/menu';
        this.editPopupHelper = new EditPopupHelper(this.httpPath, 'menus', {restaurantId: props.restaurantId});
        this.http.get('/menus?restaurantId=' + props.restaurantId).then(result => {
            let newState = this.state;
            newState.menus = result;
            this.setState(newState);
        }).catch(err => {
            console.log(err);
        });
    }

    editMenu (menuIndex) {
        let newState = this.state;
        if (menuIndex !== undefined) {
            newState.editMenuData = Object.assign({}, this.state.menus[menuIndex]);
            for (let key in newState.editMenuData) {
                if (key !== 'id' && key !== 'name') {
                    delete newState.editMenuData[key];
                }
            }
        } else {
            newState.editMenuData = false;
        }
        newState.editMenu = true;
        this.setState(newState);
    }
    editMenuClose () {
        let newState = this.state;
        newState.editMenuData = false;
        newState.editMenu = false;
        this.setState(newState);
    }

    createMenu (formData) {
        const that = this;
        this.editPopupHelper.createItem(this.state, formData).then(newState => {
            that.setState(newState);
            that.editMenuClose();
        });
    }
    updateMenu (id, formData) {
        const that = this;
        this.editPopupHelper.updateItem(this.state, id, formData).then(newState => {
            that.setState(newState);
            that.editMenuClose();
        });
    }
    deleteMenu (id) {
        const that = this;
        this.editPopupHelper.deleteItem(this.state, id).then(newState => {
            that.setState(newState);
            that.editMenuClose();
        });
    }

    render () {
        let menuItems = [];
        this.state.menus.forEach((menuItem, x) => {
            menuItems.push(<RestaurantMenusItem menu={menuItem} key={x} index={x} switchViews={this.props.switchViews} edit={this.editMenu} restaurantId={this.props.restaurantId}/>);
        });
        let editPopup;
        if (this.state.editMenu) {
            let formFields = ['name'];
            editPopup = <EditPopup formData={this.state.editMenuData} formFields={formFields} create={this.createMenu} update={this.updateMenu} delete={this.deleteMenu} close={this.editMenuClose} />;
        }
        return (
            <div id="restaurant-menus">
                <CreateItem text="CREATE MENU" click={this.editMenu.bind(this, undefined)} />
                {menuItems}
                {editPopup}
            </div>
        );
    }
}

export default RestaurantMenus;

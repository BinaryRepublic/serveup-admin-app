import React, { Component } from 'react';
import RestaurantMenusItem from '../components/RestaurantMenusItem';
import RealmHelper from '../library/RealmHelper';
import EditPopup from './EditPopup';
import EditPopupHelper from '../library/EditPopupHelper';

class RestaurantMenus extends Component {
    constructor (props) {
        super(props);
        this.state = {
            menus: []
        };

        // load menus
        this.realm = new RealmHelper();
        this.realmPath = '/account/' + this.props.accountId + '/restaurant/' + this.props.restaurantId + '/menu';
        this.realm.get(this.realmPath).then(result => {
            let newState = this.state;
            newState.menus = result;
            this.setState(newState);
        }).catch(err => {
            console.log(err);
        });

        this.editPopupHelper = new EditPopupHelper(this.realmPath, 'menus');

        this.editMenu = this.editMenu.bind(this);
        this.editMenuClose = this.editMenuClose.bind(this);
        this.createMenu = this.createMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
    }

    editMenu (menuIndex) {
        let newState = this.state;
        if (menuIndex !== undefined) {
            newState.editMenuData = this.state.menus[menuIndex];
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
            menuItems.push(<RestaurantMenusItem menu={menuItem} key={x} index={x} switchViews={this.props.switchViews} edit={this.editMenu}/>);
        });
        let editPopup;
        if (this.state.editMenu) {
            let formFields = ['name'];
            editPopup = <EditPopup formData={this.state.editMenuData} formFields={formFields} create={this.createMenu} update={this.updateMenu} delete={this.deleteMenu} close={this.editMenuClose} />;
        }
        return (
            <div id="menus">
                <button onClick={this.editMenu}>create menu</button>
                {menuItems}
                {editPopup}
            </div>
        );
    }
}

export default RestaurantMenus;

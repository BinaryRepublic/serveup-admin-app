import React, { Component } from 'react';
import MenuTree from '../components/MenuTree';
import MenuForm from '../components/MenuForm';
import RealmHelper from '../library/RealmHelper';
import '../assets/css/Menu.css';
import MenuDefaultParents from "./MenuDefaultParents";

class Menu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            menu: this.props.menu,
            restaurantId: this.props.restaurantId,
            accountId: this.props.accountId,
            menuForm: false,
            menuFormData: false,
            menuFormMenuPos: []
        };

        this.realm = new RealmHelper();

        this.menuFormInit = this.menuFormInit.bind(this);
        this.menuFormClose = this.menuFormClose.bind(this);
        this.createDrink = this.createDrink.bind(this);
        this.updateDrink = this.updateDrink.bind(this);
        this.deleteDrink = this.deleteDrink.bind(this);
        this.submit = this.submit.bind(this);
    }
    menuFormInit (menuPos = [], create = true) {
        let newState = this.state;
        if (create) {
            newState.menuFormData = false;
        } else if (menuPos.length) {
            let menuFormData = this.state.menu.drinks[menuPos[0]];
            for (let x = 1; x < menuPos.length; x++) {
                menuFormData = menuFormData.child[menuPos[x]];
            }
            newState.menuFormData = menuFormData;
        } else {
            console.log('menuPos required');
            return false;
        }
        newState.menuFormMenuPos = menuPos;
        newState.menuForm = true;
        this.setState(newState);
    }
    menuFormClose () {
        let newState = this.state;
        newState.menuForm = false;
        newState.menuFormMenuPos = [];
        this.setState(newState);
    }

    createDrink (menuPos, newItem) {
        let newState = this.state;
        let worker = newState.menu.drinks;
        // find parentElem
        if (menuPos.length) {
            worker = worker[menuPos[0]];
            for (let x = 1; x < menuPos.length; x++) {
                worker = worker.child[menuPos[x]];
            }
            if (!worker.child) {
                worker.child = [];
            }
            worker.child.push(newItem);
        } else {
            worker.push(newItem);
        }
        this.setState(newState);
        this.menuFormClose();
    }
    updateDrink (menuPos, newItem) {
        let newState = this.state;
        let worker = newState.menu.drinks;
        // find element
        if (menuPos.length) {
            if (menuPos.length > 1) {
                worker = worker[menuPos[0]];
                for (let x = 1; x < menuPos.length - 1; x++) {
                    worker = worker.child[menuPos[x]];
                }
                worker.child[menuPos[menuPos.length - 1]] = newItem;
            } else {
                worker[menuPos[menuPos.length - 1]] = newItem;
            }
            this.setState(newState);
            this.menuFormClose();
            return true;
        }
        console.log('menuPos missing');
        return false;
    }
    deleteDrink (menuPos) {
        let newState = this.state;
        let worker = newState.menu.drinks;
        // find element
        if (menuPos.length) {
            if (menuPos.length > 1) {
                worker = worker[menuPos[0]];
                for (let x = 1; x < menuPos.length - 1; x++) {
                    worker = worker.child[menuPos[x]];
                }
                worker.child.splice([menuPos[menuPos.length - 1]], 1);
            } else {
                worker.splice([menuPos[menuPos.length - 1]], 1);
            }
            console.log(newState);
            this.setState(newState);
            this.menuFormClose();
            return true;
        }
        console.log('menuPos missing');
        return false;
    }

    // submit menu to database
    submit () {
        let path = '/account/' + this.state.accountId + '/restaurant/' + this.state.restaurantId + '/menu/' + this.state.menu.id;
        let newMenu = this.state.menu;
        this.realm.put(path, newMenu).then((result) => {
            console.log(result);
            if (result.error) {
                alert(result.error);
            } else {
                alert('success');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render () {
        let menuForm = [];
        let create = !(this.state.menuFormData);

        if (this.state.menuForm) {
            menuForm = <MenuForm menuItem={this.state.menuFormData} menuPos={this.state.menuFormMenuPos} createItem={this.createDrink} updateItem={this.updateDrink} deleteItem={this.deleteDrink} close={this.menuFormClose} />;
        }
        return (
            <div id="menu">
                <div id="menu-content">
                    <MenuTree drinks={this.state.menu.drinks} create={this.menuFormInit} edit={this.menuFormInit} select={this.menuFormInit} selectedMenuPos={this.state.menuFormMenuPos} selectedCreate={create} />
                    {menuForm}
                </div>
                <MenuDefaultParents defaultParents={this.state.menu.defaultParents} />
                <div id="menu-buttons">
                    <button id="menu-buttons-submit" className="hover" onClick={this.submit}>SUBMIT MENU</button>
                </div>
            </div>
        );
    }
}

export default Menu;

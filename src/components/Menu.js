import React, { Component } from 'react';
import MenuTree from '../components/MenuTree'
import MenuForm from '../components/MenuForm'

class Menu extends Component {
    constructor () {
        super();
        this.state = {
            selectedItem: false
        };
        this.menuItemUpdate = this.menuItemUpdate.bind(this);
        this.menuTreeUpdate = this.menuTreeUpdate.bind(this);
    }
    menuItemUpdate (newSelectedItem) {

    }
    menuTreeUpdate (newSelectedItem) {

    }
    render () {
        let menuForm = [];
        if (this.state.selectedItem) {
            menuForm = <MenuForm update={this.menuItemUpdate} menuItem={this.state.selectedItem} />
        }
        return (
            <div id="menu">
                MENU
                <MenuTree menu={this.props.menu} update={this.menuTreeUpdate}/>
                {menuForm}
            </div>
        );
    }
}

export default Menu;

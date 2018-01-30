import React, { Component } from 'react';
import MenuItem from './menuItem';
import MenuNew from './menuNew';
import TestdataMenus from './menus.json';
import ClickedMenu from './clickedMenu';

class ClickedRestaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: TestdataMenus,
            selectedMenu: undefined,
            showPopup3: false                            
        }
        this.addMenu = this.addMenu.bind(this);
        this.switchViews3 = this.switchViews3.bind(this);
        this.switchPopup3 = this.switchPopup3.bind(this);
    }

    switchPopup3() {
        this.setState({
          showPopup3: !this.state.showPopup3
        });
    }

    addMenu (newMenu) {
        var plus = this.state.menus;
        var newMenu = newMenu;
        plus.push(newMenu);
        this.setState({menus: plus})
    }

    switchViews3 (menu) {
        this.setState({selectedMenu: menu})
    }

    render () {

        var popup3;
        if(this.state.showPopup3) {
            popup3 = <MenuNew switchPopup3={this.switchPopup3} add={this.addMenu}/> 
        } 

        var MenuElements = [];
        for (var i = 0; i < this.state.menus.length; i++) { 
            var menu = this.state.menus[i]
            MenuElements.push(<MenuItem key={i} index={i} menu={menu} switchViews3={this.switchViews3}/>); 
        }

        if(!this.state.selectedMenu) {
            return (
                <div>
                    <button onClick={this.props.switchViews2.bind(this, undefined)}>Zurück zur Übersicht Restaurants</button>
                    <h1>
                        {this.props.restaurant.name}
                    </h1>
                    <div >
                        {MenuElements}
                    </div>
                    <button className="button" onClick={this.switchPopup3}>Neue Getränkekarte hinzufügen</button>
                    {popup3}
                </div>
            ) 
        }
        else {
            return (
                <div>
                <ClickedMenu menu={this.state.selectedMenu} switchViews3={this.switchViews3}/>
                </div>
            )
        }
        
    }
}

export default ClickedRestaurant;


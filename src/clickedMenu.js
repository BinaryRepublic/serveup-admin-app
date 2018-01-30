import React, { Component } from 'react';
import Menu from '../src/mockdata/menu.json';
import Drink from './drink.js';



class ClickedMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup4: false,
            menu: Menu                           
        }
        this.switchPopup4 = this.switchPopup4.bind(this);
    }

    switchPopup4() {
        this.setState({
          showPopup4: !this.state.showPopup4
        });
    }

    render () {

        var MenuElements2 = [];
        for (var i = 0; i < this.state.menu.drinks.length; i++) { 
            var drink = this.state.menu.drinks[i]
            MenuElements2.push(<Drink key={i} index={i} drink={drink}/>); 
        }

        return (
            <div>
                <button onClick={this.props.switchViews3.bind(this, undefined)}>Zurück zur Übersicht Menüs</button>
                <h1>
                    {this.props.menu}
                </h1>
                {MenuElements2}
            </div>
        );
    }
}

export default ClickedMenu;

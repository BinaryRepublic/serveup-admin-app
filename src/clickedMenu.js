import React, { Component } from 'react';
import Menu from '../src/mockdata/menu.json';
import Drink from './drink.js';
import './assets/css/clickedMenu.css';


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
            <div class="container">
                <button class="button2" onClick={this.props.switchViews3.bind(this, undefined)}>ZURÜCK</button>
                <div class="heading">
                    <h1>
                        {this.props.menu}
                    </h1>
                </div>
                <div className="rightContainer">
                    <div className="innerContainer">
                        <div>
                            <p>Name: </p>
                            <input className="inputfield" type="text"/>
                        </div>
                        <div className="endFloat" >
                        <p>Default: </p>
                        <input className="inputfield" type="text"/>
                        </div>
                    </div>
                </div>
                <p class="drink">
                {MenuElements2}
                </p>
            </div>
        );
    }
}

export default ClickedMenu;

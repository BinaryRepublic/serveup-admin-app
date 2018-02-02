import React, { Component } from 'react';

class RestaurantMenusItem extends Component {
    constructor () {
        super();
        this.switchViews = this.switchViews.bind(this);
        this.edit = this.edit.bind(this);
    }

    switchViews () {
        this.props.switchViews('Menu', this.props.menu, this.props.menu.name);
    }

    edit (e) {
        e.stopPropagation();
        this.props.edit(this.props.index);
    }

    render () {
        return (
            <div className="menus-item" onClick={this.switchViews}>
                <span className="menus-item-name">{this.props.menu.name}</span> -
                <span onClick={this.edit}>edit</span>
            </div>
        )
    }
}
export default RestaurantMenusItem;

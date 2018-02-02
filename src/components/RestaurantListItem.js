import React, { Component } from 'react';

class RestaurantListItem extends Component {
    constructor () {
        super();
        this.select = this.select.bind(this);
        this.edit = this.edit.bind(this);
    }
    select () {
        this.props.select(this.props.restaurant.id);
    }
    edit (e) {
        e.stopPropagation();
        this.props.edit(this.props.index);
    }
    render () {
        return (
            <div onClick={this.select} >
                <span>{this.props.restaurant.name}</span>
                <span onClick={this.edit}>edit</span>
            </div>
        );
    }
}

export default RestaurantListItem;

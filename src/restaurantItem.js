import React, { Component } from 'react';

class RestaurantItem extends Component {

    render () {
        return (
            <div onClick={this.props.switchViews2.bind(this, this.props.restaurant)} >
                <h4>{this.props.restaurant.name}</h4>
            </div>
        )
    }
}

export default RestaurantItem;

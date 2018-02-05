import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome'

class RestaurantMenusItem extends Component {
    constructor () {
        super();
        this.switchViews = this.switchViews.bind(this);
        this.edit = this.edit.bind(this);
    }

    switchViews () {
        let params = {
            content: this.props.menu,
            restaurantId: this.props.restaurantId
        };
        this.props.switchViews('Menu', params, this.props.menu.name);
    }

    edit (e) {
        e.stopPropagation();
        this.props.edit(this.props.index);
    }

    render () {
        return (
            <div className="list-item hover" onClick={this.switchViews}>
                <div className="list-item-text">
                    <span className="list-item-text-item">{this.props.menu.name}</span>
                </div>
                <div className="list-item-icons">
                    <Fa className="list-item-icons-item" icon="pencil-alt" onClick={this.edit} />
                </div>
            </div>
        );
    }
}
export default RestaurantMenusItem;

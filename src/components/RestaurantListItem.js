import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome'

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
        let className = 'list-item hover';
        if (this.props.selected) {
            className += ' selected';
        }
        return (
            <div className={className} onClick={this.select}>
                <div className="list-item-text">
                    <span className="list-item-text-item">{this.props.restaurant.name}</span>
                </div>
                <div className="list-item-icons">
                    <Fa className="list-item-icons-item" icon="pencil-alt" onClick={this.edit} />
                </div>
            </div>
        );
    }
}

export default RestaurantListItem;

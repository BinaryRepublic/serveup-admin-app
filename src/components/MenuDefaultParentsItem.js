import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome';

class MenuDefaultParentsItem extends Component {
    constructor () {
        super();
        this.edit = this.edit.bind(this);
    }
    edit () {
        this.props.edit(this.props.index);
    }
    render () {
        return (
            <div className="list-item" onClick={this.switchViews}>
                <div className="list-item-text">
                    <span className="list-item-text-item">{this.props.defaultParent.name}</span>
                    <Fa className="list-item-text-item" icon="chevron-right" />
                    <span className="list-item-text-item">{this.props.defaultParent.parent}</span>
                </div>
                <div className="list-item-icons">
                    <Fa className="list-item-icons-item" icon="pencil-alt" onClick={this.edit} />
                </div>
            </div>
        );
    }
}
export default MenuDefaultParentsItem;

import React, { Component } from 'react';

class MenuFormItem extends Component {
    render () {
        return (
            <div className="menu-form-item">
                <label className="menu-form-item-label" htmlFor={this.props.name}>{this.props.name}</label>
                <input className="menu-form-item-input" type={this.props.type} placeholder={this.props.placeholder} onChange={this.props.handleChange} value={this.props.value} checked={this.props.value} name={this.props.name} />
            </div>
        );
    }
}

export default MenuFormItem;

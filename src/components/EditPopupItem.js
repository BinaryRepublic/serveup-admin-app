import React, { Component } from 'react';

class EditPopupItem extends Component {
    render () {
        return (
            <div className="popup-form-item">
                <label className="popup-form-item-label" htmlFor={this.props.name}>{this.props.name}</label>
                <input className="popup-form-item-input" name={this.props.name} type={this.props.type} value={this.props.value} onChange={this.props.handleChange} placeholder={this.props.placeholder} checked={this.props.value} />
            </div>
        );
    }
}

export default EditPopupItem;

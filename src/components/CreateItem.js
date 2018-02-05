import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome'

class CreateItem extends Component {
    render () {
        return (
            <div className="create-item hover" onClick={this.props.click}>
                <Fa className="create-item-icon" icon="plus" />
                <span className="create-item-text">{this.props.text}</span>
            </div>
        );
    }
}

export default CreateItem;

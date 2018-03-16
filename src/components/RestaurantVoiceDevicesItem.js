import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome';

class RestaurantVoiceDevicesItem extends Component {
    constructor () {
        super();
        this.edit = this.edit.bind(this);
    }

    edit (e) {
        e.stopPropagation();
        this.props.edit(this.props.index);
    }

    render () {
        return (
            <div className="list-item">
                <div className="list-item-text">
                    <span className="list-item-text-item">Table Number {this.props.voiceDevice.number}</span><br />
                    <span className="list-item-text-item voice-device-id">ID: {this.props.voiceDevice.id}</span>
                </div>
                <div className="list-item-icons">
                    <Fa className="list-item-icons-item" icon="pencil-alt" onClick={this.edit} />
                </div>
            </div>
        );
    }
}
export default RestaurantVoiceDevicesItem;

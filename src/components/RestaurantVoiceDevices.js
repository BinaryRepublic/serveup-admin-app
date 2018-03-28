import React, { Component } from 'react';
import RestaurantVoiceDevicesItem from '../components/RestaurantVoiceDevicesItem';
import CreateItem from '../components/CreateItem';
import EditPopup from './EditPopup';
import EditPopupHelper from '../library/EditPopupHelper';

import HttpHelper from '../ro-webapp-helper/http';
import ServerConfig from '../serverConfig';

class RestaurantVoiceDevices extends Component {
    constructor (props) {
        super(props);
        this.state = {
            voiceDevices: []
        };

        this.serverCfg = new ServerConfig();
        this.http = new HttpHelper(this.serverCfg.adminApi, this.serverCfg.authApi);

        this.componentWillReceiveProps(props);

        this.editVoiceDevice = this.editVoiceDevice.bind(this);
        this.editVoiceDeviceClose = this.editVoiceDeviceClose.bind(this);
        this.createVoiceDevice = this.createVoiceDevice.bind(this);
        this.updateVoiceDevice = this.updateVoiceDevice.bind(this);
        this.deleteVoiceDevice = this.deleteVoiceDevice.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps (props) {
        // load voiceDevices
        this.httpPath = '/voiceDevice';
        this.editPopupHelper = new EditPopupHelper(this.httpPath, 'voiceDevices', {restaurantId: props.restaurantId});
        this.http.get('/voicedevices?restaurantId=' + props.restaurantId).then(result => {
            let newState = this.state;
            newState.voiceDevices = result;
            this.setState(newState);
        }).catch(err => {
            console.log(err);
        });
    }

    editVoiceDevice (voiceDeviceIndex) {
        let newState = this.state;
        if (voiceDeviceIndex !== undefined) {
            newState.editVoiceDeviceData = Object.assign({}, this.state.voiceDevices[voiceDeviceIndex]);
            for (let key in newState.editVoiceDeviceData) {
                if (key !== 'id' && key !== 'number') {
                    delete newState.editVoiceDeviceData[key];
                }
            }
        } else {
            newState.editVoiceDeviceData = false;
        }
        newState.editVoiceDevice = true;
        this.setState(newState);
    }
    editVoiceDeviceClose () {
        let newState = this.state;
        newState.editVoiceDeviceData = false;
        newState.editVoiceDevice = false;
        this.setState(newState);
    }

    createVoiceDevice (formData) {
        const that = this;
        this.editPopupHelper.createItem(this.state, formData).then(newState => {
            that.setState(newState);
            that.editVoiceDeviceClose();
        });
    }
    updateVoiceDevice (id, formData) {
        const that = this;
        this.editPopupHelper.updateItem(this.state, id, formData).then(newState => {
            that.setState(newState);
            that.editVoiceDeviceClose();
        });
    }
    deleteVoiceDevice (id) {
        const that = this;
        this.editPopupHelper.deleteItem(this.state, id).then(newState => {
            that.setState(newState);
            that.editVoiceDeviceClose();
        });
    }

    render () {
        let voiceDeviceItems = [];
        this.state.voiceDevices.forEach((voiceDeviceItem, x) => {
            voiceDeviceItems.push(<RestaurantVoiceDevicesItem voiceDevice={voiceDeviceItem} key={x} index={x} edit={this.editVoiceDevice} restaurantId={this.props.restaurantId}/>);
        });
        let editPopup;
        if (this.state.editVoiceDevice) {
            let formFields = ['number'];
            editPopup = <EditPopup formData={this.state.editVoiceDeviceData} formFields={formFields} create={this.createVoiceDevice} update={this.updateVoiceDevice} delete={this.deleteVoiceDevice} close={this.editVoiceDeviceClose} />;
        }
        return (
            <div id="restaurant-voicedevices">
                <CreateItem text="CREATE VOICEDEVICE" click={this.editVoiceDevice.bind(this, undefined)} />
                {voiceDeviceItems}
                {editPopup}
            </div>
        );
    }
}

export default RestaurantVoiceDevices;

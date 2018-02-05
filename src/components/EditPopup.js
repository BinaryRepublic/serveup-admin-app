import React, { Component } from 'react';
import EditPopupItem from './EditPopupItem';
import '../assets/css/EditPopup.css';

class EditPopup extends Component {
    constructor (props) {
        super(props);

        let formData = {};
        let formDataId = false;
        let create = false;

        if (this.props.formData) {
            formData = this.props.formData;
            formDataId = formData.id;
            delete formData.id;
        } else {
            create = true;
        }
        this.state = {
            formData: formData,
            formDataId: formDataId,
            create: create
        };

        this.handleChange = this.handleChange.bind(this);
        this.createItem = this.createItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    handleChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let newState = this.state;
        newState.formData[name] = value;
        this.setState(newState);
    }

    createItem () {
        this.props.create(this.state.formData);
    }
    updateItem () {
        this.props.update(this.state.formDataId, this.state.formData);
    }
    deleteItem () {
        this.props.delete(this.state.formDataId);
    }

    render () {
        let inputItems = [];
        this.props.formFields.forEach((key, x) => {
            let type = 'text';
            if (typeof key === 'object') {
                type = key.type;
                key = key.name;
            }
            let value;
            let formData = this.state.formData[key];
            if (this.create) {
                value = '';
            } else {
                value = formData;
            }
            if (value === undefined) {
                switch (type) {
                case 'checkbox':
                    value = false;
                    break;
                default:
                    value = '';
                    break;
                }
            }
            inputItems.push(<EditPopupItem key={key} name={key} type={type} value={value} handleChange={this.handleChange} placeholder="" />)
        });

        let actionButtons;
        if (this.state.create) {
            actionButtons = <button className="popup-form-submit hover" type="submit" onClick={this.createItem}>create</button>;
        } else {
            actionButtons = [];
            actionButtons.push(<button key={0} className="popup-form-submit hover" type="submit" onClick={this.updateItem}>update</button>);
            actionButtons.push(<button key={1} className="popup-form-delete hover" type="submit" onClick={this.deleteItem}>delete</button>);
        }

        return (
            <div className='popup'>
                <div className='popup-overlay'></div>
                <div className='popup-inner'>
                    <h1 className="popup-title">{this.props.title}</h1>
                    <div className="popup-form">
                        {inputItems}
                        <div className="popup-form-buttons">
                            {actionButtons}
                            <button className="popup-form-close hover" onClick={this.props.close}>cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPopup;

import React, { Component } from 'react';
import '../assets/css/EditPopup.css';

class EditPopup extends Component {
    constructor(props) {
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
            this.props.formFields.forEach((item) => {
                formData[item] = '';
            });
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

    handleChange(event) {
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
        for (let key in this.state.formData) {
            inputItems.push(<input key={key} name={key} value={this.state.formData[key]} onChange={this.handleChange} placeholder={key}/>);
        }

        let actionButtons;
        if (this.state.create) {
            actionButtons = <button className="buttonSubmit" type="submit" onClick={this.createItem}>create</button>;
        } else {
            actionButtons = [];
            actionButtons.push(<button key={0} className="buttonSubmit" type="submit" onClick={this.updateItem}>update</button>);
            actionButtons.push(<button key={1} className="buttonSubmit" type="submit" onClick={this.deleteItem}>delete</button>);
        }

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.title}</h1>
                    <form>
                        {inputItems}
                    </form>
                    {actionButtons}
                    <button className="buttonClose" onClick={this.props.close}>cancel</button>
                </div>
            </div>
        );
    }
}

export default EditPopup;

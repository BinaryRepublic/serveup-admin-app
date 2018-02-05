import React, { Component } from 'react';
import MenuFormItem from './MenuFormItem';
import MenuFormVar from './MenuFormVar';

class MenuForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            inputNames: ['name', 'synonym', 'alone', 'default', 'productName']
        };

        this.componentSetState = this.componentSetState.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.createFormVar = this.createFormVar.bind(this);
        this.updateFormVar = this.updateFormVar.bind(this);
        this.deleteFormVar = this.deleteFormVar.bind(this);

        this.createItem = this.createItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.close = this.close.bind(this);
    };

    componentSetState (props) {
        let newState = this.state;
        if (!props.menuItem) {
            newState.create = true;
            newState.menuItem = {};
            this.state.inputNames.forEach((item) => {
                if (item !== 'alone') {
                    newState.menuItem[item] = '';
                } else {
                    // default true
                    newState.menuItem[item] = true;
                }
            });
            newState.menuItem.var = [];
        } else {
            newState.menuItem = this.convertToForm(props.menuItem);
            newState.create = false;
        }
        this.setState(newState);
    }
    componentWillMount () {
        this.componentSetState(this.props);
    }
    componentWillReceiveProps (nextProps) {
        this.componentSetState(nextProps);
    }

    handleChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let newState = this.state;
        newState.menuItem[name] = value;
        this.setState(newState);
    }

    createFormVar (newData) {
        let newState = this.state;
        if (!newState.menuItem.var) {
            newState.menuItem.var = [];
        }
        newData.size = parseInt(newData.size, 10);
        newData.price = parseFloat(newData.price);
        newState.menuItem.var.push(newData);
        this.setState(newState);
    }
    updateFormVar (index, newData) {
        let newState = this.state;
        newData.size = parseInt(newData.size, 10);
        newData.price = parseFloat(newData.price);
        newState.menuItem.var[index] = newData;
        this.setState(newState);
    }
    deleteFormVar (index) {
        let newState = this.state;
        newState.menuItem.var.splice(index, 1);
        this.setState(newState);
    }

    convertToDB (formObj) {
        for (let key in formObj) {
            if (typeof formObj[key] === 'string') {
                formObj[key] = formObj[key].toLowerCase();
            }
        }
        console.log(formObj.synonym);
        if (formObj.synonym && formObj.synonym !== '') {
            formObj.synonym = formObj.synonym.replace(/ /g, '').split(',');
        } else {
            formObj.synonym = [];
        }
        console.log(formObj.synonym);
        return formObj;
    }
    convertToForm (dbObj) {
        if (dbObj.synonym) {
            dbObj.synonym = dbObj.synonym.join(',');
        }
        return dbObj;
    }

    createItem () {
        this.props.createItem(this.props.menuPos, this.convertToDB(this.state.menuItem));
    }
    updateItem () {
        this.props.updateItem(this.props.menuPos, this.convertToDB(this.state.menuItem));
    }
    deleteItem () {
        this.props.deleteItem(this.props.menuPos);
    }
    close () {
        this.props.close();
    }

    render () {
        let menuFormItem = [];
        this.state.inputNames.forEach((item, x) => {
            let type = 'text';
            if (item === 'alone') {
                type = 'checkbox';
            }
            menuFormItem.push(<MenuFormItem key={x} name={item} type={type} placeholder="" handleChange={this.handleChange} value={this.state.menuItem[item]} />);
        });
        let submitButton = <div className="menu-form-button-item hover" onClick={this.createItem}>CREATE</div>;
        if (!this.state.create) {
            submitButton = [];
            submitButton.push(<div className="menu-form-button-item hover" key={0} onClick={this.updateItem}>UPDATE</div>);
            submitButton.push(<div className="menu-form-button-item hover delete" key={1} onClick={this.deleteItem}>DELETE</div>);
        }
        return (
            <div id="menu-form" className="menu-content-item">
                {menuFormItem}
                <MenuFormVar formVar={this.state.menuItem.var} createItem={this.createFormVar} updateItem={this.updateFormVar} deleteItem={this.deleteFormVar} />
                <div id="menu-form-button">
                    {submitButton}
                    <div className="menu-form-button-item hover" onClick={this.close}>CLOSE</div>
                </div>
            </div>
        );
    }
}

export default MenuForm;

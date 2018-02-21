import React, { Component } from 'react';
import MenuFormVarItem from './MenuFormVarItem';
import EditPopup from './EditPopup';
import CreateItem from './CreateItem';

class MenuFormVar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            formVar: this.props.formVar,
            editMenuFormVar: false,
            editMenuFormVarData: false
        };

        this.editMenuFormVar = this.editMenuFormVar.bind(this);
        this.editMenuFormVarClose = this.editMenuFormVarClose.bind(this);
        this.createMenuFormVar = this.createMenuFormVar.bind(this);
        this.updateMenuFormVar = this.updateMenuFormVar.bind(this);
        this.deleteMenuFormVar = this.deleteMenuFormVar.bind(this);
    }

    editMenuFormVar (varIndex) {
        let newState = this.state;
        if (varIndex !== undefined) {
            newState.editMenuFormVarData = Object.assign({}, this.state.formVar[varIndex]);
        } else {
            newState.editMenuFormVarData = false;
        }
        newState.editMenuFormVar = true;
        this.setState(newState);
    }
    editMenuFormVarClose () {
        let newState = this.state;
        newState.editMenuFormVar = false;
        newState.editMenuFormVarData = false;
        this.setState(newState);
    }

    createMenuFormVar (formData) {
        this.editMenuFormVarClose();
        this.props.createItem(formData);
    }
    updateMenuFormVar (index, formData) {
        this.editMenuFormVarClose();
        this.props.updateItem(index, formData);
    }
    deleteMenuFormVar (index) {
        this.editMenuFormVarClose();
        this.props.deleteItem(index);
    }

    render () {
        let vars = [];
        this.props.formVar.forEach((item, x) => {
            vars.push(<MenuFormVarItem key={x} index={x} formVar={item} edit={this.editMenuFormVar} />);
        });
        let editPopup;
        if (this.state.editMenuFormVar) {
            editPopup = <EditPopup formData={this.state.editMenuFormVarData} formFields={['size', 'price', {name: 'default', type: 'checkbox'}]} create={this.createMenuFormVar} update={this.updateMenuFormVar} delete={this.deleteMenuFormVar} close={this.editMenuFormVarClose} />;
        }
        return (
            <div id="menu-form-var" className="menu-form-item">
                <CreateItem click={this.editMenuFormVar.bind(this, undefined)} text="CREATE VAR"/>
                {vars}
                {editPopup}
            </div>
        );
    }
}

export default MenuFormVar;

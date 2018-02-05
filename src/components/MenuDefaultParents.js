import React, { Component } from 'react';
import MenuDefaultParentsItem from './MenuDefaultParentsItem';
import EditPopup from './EditPopup';
import CreateItem from './CreateItem';

class MenuDefaultParents extends Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultParents: this.props.defaultParents,
            editDp: false,
            editDpData: false
        };

        this.editDp = this.editDp.bind(this);
        this.editDpClose = this.editDpClose.bind(this);
        this.createDp = this.createDp.bind(this);
        this.updateDp = this.updateDp.bind(this);
        this.deleteDp = this.deleteDp.bind(this);
    }

    editDp (index) {
        let newState = this.state;
        if (index !== undefined) {
            newState.editDpData = this.state.defaultParents[index];
        } else {
            newState.editDpData = false;
        }
        newState.editDp = true;
        this.setState(newState);
    }
    editDpClose () {
        let newState = this.state;
        newState.editDp = false;
        newState.editDpData = false;
        this.setState(newState);
    }

    convertToDB (formObj) {
        for (let key in formObj) {
            if (typeof formObj[key] === 'string') {
                formObj[key] = formObj[key].toLowerCase();
            }
        }
        return formObj;
    }

    createDp (formData) {
        this.editDpClose();
        formData = this.convertToDB(formData);
        let newState = this.state;
        newState.defaultParents.push(formData);
        this.setState(newState);
    }
    updateDp (index, formData) {
        this.editDpClose();
        formData = this.convertToDB(formData);
        let newState = this.state;
        newState.defaultParents[index] = formData;
        this.setState(newState);
    }
    deleteDp (index) {
        this.editDpClose();
        let newState = this.state;
        newState.defaultParents.splice(index, 1);
        this.setState(newState);
    }

    render () {
        let vars = [];
        this.state.defaultParents.forEach((item, x) => {
            vars.push(<MenuDefaultParentsItem key={x} index={x} defaultParent={item} edit={this.editDp} />);
        });
        let editPopup;
        if (this.state.editDp) {
            editPopup = <EditPopup formData={this.state.editDpData} formFields={['name', 'parent']} create={this.createDp} update={this.updateDp} delete={this.deleteDp} close={this.editDpClose} />;
        }
        return (
            <div id="menu-default-parents">
                <CreateItem click={this.editDp} text="CREATE DEFAULT PARENT"/>
                {vars}
                {editPopup}
            </div>
        );
    }
}

export default MenuDefaultParents;

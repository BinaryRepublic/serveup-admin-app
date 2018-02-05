import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome';

class MenuFormVarItem extends Component {
    constructor () {
        super();
        this.edit = this.edit.bind(this);
    }
    edit (e) {
        e.stopPropagation();
        this.props.edit(this.props.index);
    }
    render () {
        let defaultVar = [];
        if (this.props.formVar.default) {
            defaultVar = <span className="menu-form-var-item-text-default">DEFAULT</span>;
        }
        return (
            <div className="menu-form-var-item list-item">
                <div className="menu-form-var-item-icon">
                    <Fa className="menu-form-var-item-icon-item" icon="pencil-alt" onClick={this.edit} />
                </div>
                <div className="menu-form-var-item-text">
                    <span>{this.props.formVar.size} ml</span> - <span>{this.props.formVar.price} &euro;</span>
                    {defaultVar}
                </div>
            </div>
        );
    }
}
export default MenuFormVarItem;

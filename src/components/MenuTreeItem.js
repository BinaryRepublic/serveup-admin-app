import React, { Component } from 'react';
import Fa from '@fortawesome/react-fontawesome'

class MenuTreeItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showChildren: false
        };

        this.switchChildren = this.switchChildren.bind(this);

        this.clickEdit = this.clickEdit.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
        this.editChain = this.editChain.bind(this);
    }

    switchChildren () {
        this.setState({showChildren: !this.state.showChildren});
    }

    clickEdit (e) {
        e.stopPropagation();
        this.props.edit(this.props.menuPos, false);
    }
    clickAdd (e) {
        e.stopPropagation();
        this.props.edit(this.props.menuPos, true);
    }

    editChain (menuPos, create) {
        this.props.edit(menuPos, create);
    }

    render () {
        if (this.state.showChildren) {
            var children = [];
            if (this.props.drink.child) {
                for (var i = 0; i < this.props.drink.child.length; i++) {
                    var drink = this.props.drink.child[i];
                    let newMenuPos = this.props.menuPos.slice();
                    newMenuPos.push(i);
                    children.push(<MenuTreeItem key={i} menuPos={newMenuPos} drink={drink} edit={this.editChain} selectedMenuPos={this.props.selectedMenuPos} selectedCreate={this.props.selectedCreate} />);
                }
            }
        }
        let menuPos = this.props.menuPos;
        let selectedMenuPos = this.props.selectedMenuPos;
        let selectedMenuPosBool = false;
        if (menuPos.length && menuPos.length === selectedMenuPos.length) {
            selectedMenuPosBool = true;
            menuPos.forEach((item, x) => {
                if (item !== selectedMenuPos[x]) {
                    selectedMenuPosBool = false;
                }
            });
        }
        return (
            <div className={'menu-tree-item ' + (selectedMenuPosBool ? 'selected ' : '') + (this.props.selectedCreate ? 'create ' : '')}>
                <div className="menu-tree-item-content">
                    <div className="menu-tree-item-content-icons">
                        <Fa className="menu-tree-item-content-icons-item menu-tree-item-content-icons-item-edit" icon="pencil-alt" onClick={this.clickEdit} />
                        <Fa className="menu-tree-item-content-icons-item menu-tree-item-content-icons-item-create" icon="plus" onClick={this.clickAdd} />
                    </div>
                    <div className="menu-tree-item-content-text" onClick={this.switchChildren}>
                        {this.props.drink.name}
                    </div>
                </div>
                <div className="menu-tree-item-children">
                    {children}
                </div>
            </div>
        );
    }
}

export default MenuTreeItem;

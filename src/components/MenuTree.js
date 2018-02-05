import React, { Component } from 'react';
import MenuTreeItem from './MenuTreeItem';
import CreateItem from '../components/CreateItem';

class MenuTree extends Component {
    constructor () {
        super();
        this.create = this.create.bind(this);
    }
    create () {
        this.props.create([], true);
    }
    render () {
        // creating menu tree items (highest parents)
        let menuTreeItems = [];
        this.props.drinks.forEach((item, x) => {
            if (item) {
                menuTreeItems.push(<MenuTreeItem key={x} menuPos={[x]} drink={item} edit={this.props.edit} selectedMenuPos={this.props.selectedMenuPos} selectedCreate={this.props.selectedCreate} />);
            }
        });
        return (
            <div id="menu-tree" className="menu-content-item">
                <CreateItem click={this.create} text="PARENT" />
                {menuTreeItems}
            </div>
        );
    }
}

export default MenuTree;

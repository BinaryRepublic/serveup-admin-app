import React, { Component } from 'react';
import '../assets/css/Nav.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navigateViews = this.navigateViews.bind(this);
    }
    navigateViews (navName) {
        this.props.navigateViews(navName);
    }
    render () {
        let navItems = [];
        this.props.items.forEach((item, x) => {
            navItems.push(<li key={x} onClick={this.navigateViews.bind(this, item.navName)}>{item.navName}</li>);
        });
        return (
            <div className="nav">
                Navigation
                <ul>
                    {navItems}
                </ul>
            </div>
        );
    }
}

export default Nav;

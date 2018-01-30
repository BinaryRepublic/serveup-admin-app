import React, { Component } from 'react';

class MenuItem extends Component {

    render () {
        return (
            <div onClick={this.props.switchViews3.bind(this, this.props.menu)}>
                <p>
                {this.props.menu}
                </p>
            </div>
        )
    }
}

export default MenuItem;

import React, { Component } from 'react';
import './assets/css/menuNew.css';

class MenuNew extends Component {
    constructor(props) {
        super(props);
        this.onClick2 = this.onClick2.bind(this);
    }

    onClick2 () {
        this.props.switchPopup3();
        var name = document.getElementById("name").value;
        this.props.add(name);
    }

    render () {

        return (
            <div className='popup3'>
                <div className='popup3_inner'>
                <h1>Neue Getränkekarte erstellen</h1>
                <form>
                    <input id="name" placeholder="Name"/>
                </form>
                    <input className="submitNewMenu" type="submit" value="Erstellen" onClick={this.onClick2} />
                <button className="buttonClose" onClick={this.props.switchPopup3}>Abbrechen</button>
                </div>
            </div>
        );
    }
}

export default MenuNew;

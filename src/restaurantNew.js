import React, { Component } from 'react';
import './assets/css/restaurantNew.css';

class RestaurantNew extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.props.switchPopup2();
        var name = document.getElementById("name").value;
        var street = document.getElementById("street").value;
        var houseNumber = document.getElementById("houseNumber").value;
        var zip = document.getElementById("zip").value;
        var size = document.getElementById("size").value;

        var newRestaurant = {
            name: name,
            street: street,
            houseNumber: houseNumber,
            zip: zip,
            size: size
        };
        this.props.add(newRestaurant);
    }

    render () {

        return (
            <div className='popup2'>
                <div className='popup2_inner'>
                <h1>Neues Restaurant erstellen</h1>
                <form>
                    <input id="name" placeholder="Name"/>
                    <input id="street" placeholder="Straße"/>
                    <input id="houseNumber" placeholder="Hausnummer"/>
                    <input id="zip" placeholder="Postleitzahl"/>
                    <input id="size" placeholder="Größe"/>

                </form>
                    <input className="submitNewAccount" type="submit" value="Erstellen" onClick={this.onClick} />
                <button className="buttonClose" onClick={this.props.switchPopup2}>Abbrechen</button>
                </div>
            </div>
        );
    }
}

export default RestaurantNew;

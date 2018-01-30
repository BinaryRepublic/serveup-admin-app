import React, { Component } from 'react';
import './assets/css/showDrinkPopUp.css';

class ShowDrinkPopUp extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick () {
        this.props.switchDrinkPopUp();
        var name = document.getElementById("drinkname").value;
        this.props.updateDrink(name, this.props.index);
    }

    render () {
        return (
            <div className='popup4'>
                <div className='popup4_inner'>
                <h1>Getränk ändern</h1>
                <button className="buttonClose" onClick={this.props.switchDrinkPopUp}>Abbrechen</button>
                <form>
                    <input id="drinkname" defaultValue={this.props.drink.name} />
                </form>
                <input className="submitNewSetting" type="submit" value="Speichern" onClick={this.onClick} />
                </div>
            </div>
        );
    }
}

export default ShowDrinkPopUp;

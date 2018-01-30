import React, { Component } from 'react';
import './assets/css/productPopUp.css';

class ProductPopUp extends Component {
    constructor(props) {
        super(props);
        // this.onClick2 = this.onClick2.bind(this);
    }

    // onClick2 () {
    //     this.props.switchPopup3();
    //     var name = document.getElementById("name").value;
    //     this.props.add(name);
    // }

    render () {

        return (
            <div className='popup4'>
                <div className='popup4_inner'>
                <h1>Synonym erstellen</h1>
                <form>
                    <input id="name" placeholder="Synonym 1"/>
                </form>
                    {/* <input className="submitNewMenu" type="submit" value="Erstellen" onClick={this.onClick2} /> */}
                <button className="buttonClose" onClick={this.props.switchPopup4}>Abbrechen</button>
                </div>
            </div>
        );
    }
}

export default ProductPopUp;

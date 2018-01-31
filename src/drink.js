import React, { Component } from 'react';
// import ShowDrinkPopUp from './showDrinkPopUp';
import './assets/css/drink.css';

class Drink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drink: props.drink,   
            // showDrinkPopUp: false,
            showChildren: false                                   
        }
        // this.switchDrinkPopUp = this.switchDrinkPopUp.bind(this);
        // this.updateDrink = this.updateDrink.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    // switchDrinkPopUp () {
    //     this.setState({
    //         showDrinkPopUp: !this.state.showDrinkPopUp
    //       });
    // }

    // updateDrink (newDrink, i) {
    //     console.log("Updating Comment: " + newDrink);
    //     var drink = this.state.drink;
    //     drink.name = newDrink;
    //     this.setState({drink: drink})
    // }


    onClick () {
        this.setState({showChildren: !this.state.showChildren})
    }

    render () {

        // var add;
        // if (this.state.drink.child) {
        //     { 
        //         add = <button>Add</button> 
        //     }
        // }

        // var drinkPopUp;
        // if(this.state.showDrinkPopUp) {
        //     drinkPopUp = <ShowDrinkPopUp key={i} index={i} switchDrinkPopUp={this.switchDrinkPopUp} updateDrink={this.updateDrink} drink={this.state.drink}/> 
        // } 

        if(this.state.showChildren) {
            var MenuElements3 = [];
            if (this.state.drink.child) {
                for (var i = 0; i < this.state.drink.child.length; i++) { 
                    var drink = this.state.drink.child[i]
                    MenuElements3.push(<Drink key={i} index={i} drink={drink}/>); 
                }
            }
        }

        return (
            <div className="leftContainer">
                <div className="drinks"> 
                    <div onClick={this.onClick}>
                        {this.state.drink.name}
                    </div>
                    <div>
                        <button>Edit</button>
                    </div>
                    {/* {add} */}
                    {MenuElements3}
                    {/* {drinkPopUp} */}
                </div>
            </div>
        )
    }
}

export default Drink;

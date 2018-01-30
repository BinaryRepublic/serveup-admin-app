import React, { Component } from 'react';
import RestaurantItem from './restaurantItem';
import RestaurantNew from './restaurantNew';
import TestdataRestaurants from './restaurants.json';
import ClickedRestaurant from './clickedRestaurant';

class ClickedAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: TestdataRestaurants,
            selectedRestaurant: undefined,
            showPopup2: false                            
        }
        this.addRestaurant = this.addRestaurant.bind(this);
        this.switchViews2 = this.switchViews2.bind(this);
        this.switchPopup2 = this.switchPopup2.bind(this);
    }

    switchPopup2() {
        this.setState({
          showPopup2: !this.state.showPopup2
        });
      }

    addRestaurant (newRestaurant) {
        var plus = this.state.restaurants;
        var newRestaurant = newRestaurant;
        plus.push(newRestaurant);
        this.setState({restaurants: plus})
    }

    switchViews2 (restaurant) {
        this.setState({selectedRestaurant: restaurant})
    }
    
    render () {

        var popup2;
        if(this.state.showPopup2) {
            popup2 = <RestaurantNew switchPopup2={this.switchPopup2} add={this.addRestaurant}/> 
        } 

        var RestaurantElements = [];
        for (var i = 0; i < this.state.restaurants.length; i++) { 
            var restaurant = this.state.restaurants[i]
            RestaurantElements.push(<RestaurantItem key={i} index={i} restaurant={restaurant} switchViews2={this.switchViews2}/>); 
        }
        
        if(!this.state.selectedRestaurant) {
            return (
                <div>
                    <button onClick={this.props.switchViews.bind(this, undefined)}>Zurück zur Übersicht Accounts</button>
                    <h1>
                        {this.props.account.firstName}
                        &nbsp;
                        {this.props.account.lastName}
                    </h1>
                    <div >
                        {RestaurantElements}
                    </div>
                    <button className="button" onClick={this.switchPopup2}>Neues Restaurant hinzufügen</button>
                    {popup2}
                </div>
            ) 
        }
        else {
            return (
                <div>
                <ClickedRestaurant restaurant={this.state.selectedRestaurant} switchViews2={this.switchViews2}/>
                </div>
            )
        }
        
    }
}

export default ClickedAccount;

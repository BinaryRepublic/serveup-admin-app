import React, { Component } from 'react';
import RestaurantList from '../components/RestaurantList'
import RestaurantMenus from '../components/RestaurantMenus'
// import RestaurantVoiceDevices from '../components/RestaurantVoiceDevices'
import '../assets/css/Restaurant.css';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: false
        };

        this.selectRestaurant = this.selectRestaurant.bind(this);
    }

    selectRestaurant (id) {
        let newState = this.state;
        newState.restaurantId = id;
        this.setState(newState);
    }

    render () {
        return (
            <div id="restaurant">
                <RestaurantList accountId={this.props.accountId} selectRestaurant={this.selectRestaurant}/>
                {this.state.restaurantId &&
                    <RestaurantMenus restaurantId={this.state.restaurantId} accountId={this.props.accountId} switchViews={this.props.switchViews}/>
                }
            </div>
        )
        /* -- later
            {this.state.restaurantId &&
                <RestaurantVoiceDevices restaurantId={this.state.restaurantId}/>
            }
         */
    }
}

export default Restaurant;

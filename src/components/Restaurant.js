import React, { Component } from 'react';
import RestaurantList from '../components/RestaurantList';
import RestaurantMenus from '../components/RestaurantMenus';
import RestaurantVoiceDevices from '../components/RestaurantVoiceDevices';
import '../assets/css/Restaurant.css';

class Restaurant extends Component {
    constructor (props) {
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
                <RestaurantList accountId={this.props.accountId} selectRestaurant={this.selectRestaurant} selectedId={this.state.restaurantId}/>
                <div className="restaurant-item">
                    {this.state.restaurantId &&
                        <RestaurantMenus id="restaurant-menu" restaurantId={this.state.restaurantId} switchViews={this.props.switchViews}/>
                    }
                    {this.state.restaurantId &&
                        <RestaurantVoiceDevices id="restaurant-voicedevice" restaurantId={this.state.restaurantId} />
                    }
                </div>
            </div>
        );
    }
}

export default Restaurant;

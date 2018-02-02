import React, { Component } from 'react';
import RestaurantListItem from '../components/RestaurantListItem'
import EditPopup from '../components/EditPopup'
import EditPopupHelper from '../library/EditPopupHelper'
import RealmHelper from '../library/RealmHelper';

class RestaurantList extends Component {

    constructor (props) {
        super(props);

        this.state = {
            restaurants: [],
            editRestaurant: false,
            editRestaurantData: {}
        };

        // load restaurants
        this.realm = new RealmHelper();
        this.realmPath = '/account/' + this.props.accountId + '/restaurant';
        this.realm.get(this.realmPath).then(result => {
            let newState = this.state;
            newState.restaurants = result;
            this.setState(newState);
        }).catch(err => {
            console.log(err);
        });

        // edit restaurants
        this.editPopupHelper = new EditPopupHelper(this.realmPath, 'restaurants');

        this.editRestaurant = this.editRestaurant.bind(this);
        this.editRestaurantClose = this.editRestaurantClose.bind(this);
        this.createRestaurant = this.createRestaurant.bind(this);
        this.updateRestaurant = this.updateRestaurant.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    }

    editRestaurant (restaurantIndex) {
        let newState = this.state;
        if (restaurantIndex !== undefined) {
            newState.editRestaurantData = this.state.restaurants[restaurantIndex];
            let newFormData = {};
            // format form data
            for (let key in newState.editRestaurantData) {
                if (key !== 'account') {
                    let value = newState.editRestaurantData[key];
                    if (key === 'address') {
                        for (let addrKey in newState.editRestaurantData[key]) {
                            if (addrKey !== 'id') {
                                newFormData[addrKey] = newState.editRestaurantData[key][addrKey];
                            }
                        }
                    } else {
                        newFormData[key] = value;
                    }
                }
            }
            newState.editRestaurantData = newFormData;
        } else {
            newState.editRestaurantData = false;
        }
        newState.editRestaurant = true;
        this.setState(newState);
    }
    editRestaurantClose () {
        let newState = this.state;
        newState.editRestaurantData = false;
        newState.editRestaurant = false;
        this.setState(newState);
    }

    createRestaurant (formData) {
        const that = this;
        this.editPopupHelper.createItem(this.state, formData).then(newState => {
            that.setState(newState);
            that.editRestaurantClose();
        });
    }
    updateRestaurant (id, formData) {
        const that = this;
        this.editPopupHelper.updateItem(this.state, id, formData).then(newState => {
            that.setState(newState);
            that.editRestaurantClose();
        });
    }
    deleteRestaurant (id) {
        const that = this;
        this.editPopupHelper.deleteItem(this.state, id).then(newState => {
            that.setState(newState);
            that.editRestaurantClose();
        });
    }

    render () {
        let editPopup;
        if (this.state.editRestaurant) {
            let formFields = ['name', 'street', 'postCode', 'city', 'country'];
            editPopup = <EditPopup formData={this.state.editRestaurantData} formFields={formFields} create={this.createRestaurant} update={this.updateRestaurant} delete={this.deleteRestaurant} close={this.editRestaurantClose} />;
        }
        var RestaurantElements = [];
        for (var i = 0; i < this.state.restaurants.length; i++) {
            var restaurant = this.state.restaurants[i];
            RestaurantElements.push(<RestaurantListItem key={i} index={i} restaurant={restaurant} select={this.props.selectRestaurant} edit={this.editRestaurant}/>);
        }
        return (
            <div id="restaurant-list">
                <button onClick={this.editRestaurant.bind(this, undefined)}>create restaurant</button>
                {RestaurantElements}
                {editPopup}
            </div>
        );
    }
}

export default RestaurantList;

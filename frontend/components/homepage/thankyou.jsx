import React from 'react';
import { Link } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'
import {BiSearch} from 'react-icons/bi'
import Geocode from "react-geocode";
import {getLocation, searchAddress, updateUserLocation} from '../../actions/session_actions';
import {receiveLocation} from '../../actions/greeting_actions';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import {AiFillStar, AiOutlineHeart, AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'

import { addItemToCart, clearCartItems, clearState } from '../../actions/cart_actions';



// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyB9fx4NpEW1D65AvgJjzY-npVoFUf17FRg");

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      locationBool: false,
      location: this.props.location, 
      restaurantListCount:0
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    //this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const location = Object.assign({}, this.state.address);
    Geocode.fromAddress(this.state.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        //setting store location to lat long 
        this.props.receiveLocation({lat: lat, lng: lng});
        this.props.searchAddress({category: this.state.address, latitude: lat, longitude: lng})
        this.props.updateUserLocation(this.props.currentUser.id, {category: this.state.address, latitude: lat, longitude: lng});
        window.location.href = "/#/homepage";
      },

      (error) => {
        this.setState({locationBool: true})
      }
    );
        
    }
  
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

  render() {
    return (
      <div className="homePageContainer">
        
          <div className="homepage-inner-container">
            <div className = "homePageHeader2">
                <Link to="/"  onClick={()=>{this.props.logout(); this.props.clearCartItems(); this.props.clearState()}}>
                <div className="header-button"><AiOutlineMenu color={'black'} size={20}/></div></Link>
                    <div className="numberofItems"><div><FaShoppingCart className = "shoppingCart" color={'white'} size={15}/> 0</div></div>
                <form onSubmit={this.handleSubmit} className="location">
                  <div className="location-input">
                    <BiSearch className="magnifying-glass" size={20}/>
              
                    <div className="location-input-text">
                    <input type="text"
                      value={this.state.address}
                      onChange={this.update('address')}
                     // onChange={this.update('address')}
                      className="location-input-text-inner"
                      placeholder="Enter Location"/>
                      </div>
                
                  </div>
                </form>
                    <img className="logo-home" src="/Drinkly-logo-official.png" onClick={()=>{window.location.href = "/#/homepage"}}/>
            </div>
            <div className = "thank-you">
              <div className="thank-you-inner">Thank you for your order! Please feel free to contact me at any of the links below.</div>
              <div className="social-links">
                <a className="social-ty" href="https://github.com/annieyang1993" target="_blank"><img className="social-ty" src={"/Github.png"}/></a>
                <a className="social-ty" href="https://www.linkedin.com/in/annie-yang-48780175/" target="_blank"><img className="social-ty" src={"/LinkedIn.png"}/></a>
              </div>
            <div className="before"></div>
            <div className="after"></div></div>

          </div>
       
        
      </div>
    );
  }
}

const mapStateToProps = ({ session, entities: { address, users, restaurants, currentRestaurant, menu, currentItem, modalStatus, cart, location } }) => {
    return {
        location: location,
        currentUser: users[session.id],
        restaurants: restaurants,
        currentRestaurant: currentRestaurant,
        restaurantId: currentRestaurant["id"], 
        menuList: menu,
        currentItem: currentItem,
        modalStatus: modalStatus,
        cart: cart,
        address: address

    };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  receiveLocation: (location) => dispatch(receiveLocation(location)),
  getLocation: (user_id) => dispatch(getLocation(user_id)),
  searchAddress: (address) => dispatch(searchAddress(address)),
  updateUserLocation: (user_id, location) => dispatch(updateUserLocation(user_id, location)),
  clearCartItems: ()=>dispatch(clearCartItems()),
  clearState: ()=> dispatch(clearState())

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);


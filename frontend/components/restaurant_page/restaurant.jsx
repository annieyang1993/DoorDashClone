import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './cart.js';
import {AiOutlineSearch} from 'react-icons/ai'
import ReactDOM from 'react-dom';
import {FaShoppingCart} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import {MdOutlineDescription} from 'react-icons/md'
import {BiSearch} from 'react-icons/bi'
import {FaWalking} from 'react-icons/fa'
import {GiFireDash} from 'react-icons/gi'
import {BsDot} from 'react-icons/bs'
import {AiFillStar, AiOutlineHeart, AiOutlineMenu} from 'react-icons/ai'
import {BsStarFill, BsStarHalf} from 'react-icons/bs'
import Geocode from "react-geocode";
import Carousel from '../homepage/carousel.jsx'

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


class RestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            locationDrop: false,
            location: this.props.location,
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    rad = function(x) {
    return x * Math.PI / 180;
    };

    getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = Number(this.rad(Number(p2.lat) - Number(p1.lat)));
    var dLong = Number(this.rad(Number(p2.lng) - Number(p1.lng)));
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(Number(this.rad(p1.lat))) * Math.cos(Number(this.rad(p2.lat))) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return ((d/1000)/5*60).toFixed(0); // returns the distance in meter
    };

    componentDidMount(){
        var urlArray = window.location.href.split("/");
        var restaurantId = urlArray[urlArray.length - 1];
        var itemList=[]
        this.props.getCurrentRestaurant(restaurantId).then(()=>{
            this.props.menu(restaurantId);
        })    
         this.getLocation();

    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
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
        alert("Please type in valid address")
        this.setState({locationBool: true})
      }
    );
        
    }

    renderEvenBox(count){
        if (count%2===0){
            return (<div></div>)
        } else{
            return (<li className="evenMenuItem" key={count+1}>

                <div className="evenMenuItemLeft"></div>
            </li>)
        }
    }

    handleClick(id){
        this.props.getItem(this.props.restaurantId, id);
        this.props.setModal(true);
        //console.log(id);
        //const {currentItem} = this.props;
    }

    getLocation = async () =>{
    const location = await this.props.getLocation(this.props.currentUser["id"]);
      //this.setState({address: this.props.address["address_1"]+", "+this.props.address["city"]+", "+this.props.address["state"]})
        const lat = this.props.address.latitude;
        const lng = this.props.address.longitude;
        this.props.receiveLocation({lat: lat, lng: lng});
        this.setState({locationBool: true})
        this.setState({location: {lat: Number(lat), lng: Number(lng)}})
        // Geocode.fromLatLng(lat, lng).then(
        //   (response) => {
        //     const address = response.results[0].formatted_address;
        //     this.setState({address: address})
        //   })
        this.setState({address: this.props.address.category})
  }



    renderItemList() {

        var menuList = Object.values(this.props.menuList)
        var menuSections = []
        menuList.forEach((element)=>{
            if (!menuSections.includes(element["section"])){
                menuSections.push(element["section"]);
            }   
        })
        return (
            <div> 


                <ul className="menuItems">
                    {menuSections.map((element, i)=>{
                        var count = 0;
                        return(
                        <li className = "section" key={element}>
                            <br /><div className="sectionTitle">{element}</div>
                            <ul className = "sectionItems">
                            {menuList.map((element2, i) => {
                                
                                if (element2["section"]===element){
                                    count+=1;
                                    return(
                                    <li className="menuItem" key={element2["name"]} onClick={()=>this.handleClick(element2["id"])}>
                                        
                                        <div className="menuItemLeft">{element2["item_name"]}
                                        <div className="menuItemDescription">{element2["item_description"]}</div>
                                        </div>
                                        
                                        <img className="menuItemRight" src={element2["img"] ? `/Partners/${element2["img"]}.png` : 'FillerLogo.png'} />
                                    </li>)
                                } else{
                                    return(<div></div>)
                                }

                            })}
                            <div>
                            {this.renderEvenBox(count)}
                            </div>
                                    
                            </ul> 
                                <div className="break" />
                                
                                

                        </li> 
                        )
                            

                         

                    
                        })}

               
                </ul>
                




                  
            </div>
        );
    }

    render() {
        var distance = this.getDistance(this.props.location, {lat: this.props.currentRestaurant["latitude"], lng: this.props.currentRestaurant["longitude"]})
        var dollarSign = [];
        for (let i = 0; i<this.props.currentRestaurant["pricing"]; i++){
            dollarSign.push(<div className="dollar-sign">$</div>)
        }
        var starList = [];
        var starNum = Math.floor(Number(this.props.currentRestaurant["rating"]));
        for (let i = 0; i<starNum; i++){
            starList.push(<BsStarFill className="bs-star-rating" color={'rgb(227, 199, 14)'} size={20}/>)
        }
        if (Number(this.props.currentRestaurant["rating"])-starNum===0.5){
            starList.push(<BsStarHalf className="bs-star-rating" color={'rgb(227, 199, 14)'} size={20}/>)
        }

        //console.log(this.props.currentRestaurant);
        return (
            
            <div id="restaurant-container" className="restaurant-container" >
                <div className = "homePageHeader">

                <Link to="/"  className="header-button2" onClick={()=>{this.props.logout(); this.props.clearCartItems(); this.props.clearState()}}><AiOutlineMenu color={'black'} size={20}/></Link>
                <div className="numberofItems">{Object.values(this.props.cart).length === 0 ? <div><FaShoppingCart className = "shoppingCart" color={'white'} size={15}/> 0</div> : <div><FaShoppingCart className = "shoppingCart" color={'white'} size={15}/> {Object.values(this.props.cart).length}</div>}</div>
                <form onSubmit={this.handleSubmit} className="location">
                    <div className="location-input">
                    <BiSearch className="magnifying-glass" size={20}/>
              
                    <div className="location-input-text">
                    <label>
                    <input type="text"
                      value={this.state.address}
                      onChange={this.update('address')}
                      className="location-input-text-inner"
                      placeholder="Enter Location"
                      onClick={()=>{
                          this.setState({locationDrop: true})
                          console.log(this.state.locationDrop)
                      }} 
                      />
     
                      </label>
                      </div>

                
                  </div>
                </form>
                <img className="logo-home" src="/Drinkly-logo-official.png" onClick={()=>{window.location.href = "/#/homepage"}}/>
                
                </div>

                <div className="restaurant-and-menu-container" onClick={()=>this.setState({locationDrop: false})}>
                <div className = "restaurantInfoContainer">
                    <img src={this.props.currentRestaurant["img1"]} className = "restaurant-header-img"/>
                    <div className="restaurant-name">{this.props.currentRestaurant["name"]}</div>
                    <div className="restaurant-description">
                    <GiFireDash className= "flex-rating-word"/>
                    <div className="flex-star-bold">DrinklyPass</div>
                    <BsDot className="dot"/>
                    <div className="dot">{this.props.currentRestaurant["description"]}</div>
                    <BsDot className="dot"/>
                    <div className="dot">{this.props.currentRestaurant["rating"]}  </div>

                    <AiFillStar className= "dot2"/>
                     <div className="dot">  ({this.props.currentRestaurant["number_of_ratings"]} ratings)</div>
                    
                    {distance=== 'NaN' ? <div></div> : <div><BsDot className="dot"/>
                    <div className="dot">{(distance/60*5).toFixed(1)} km</div></div>}
                    
                    <BsDot className="dot"/>
                     <div className="dot">{dollarSign}</div>

                    </div>              
                    <div className="restaurant-address">
                    <div className="restaurant-page-box">
                    { distance=== 'NaN' ? 
                    <div className="inner-box">
                        <div className="distance-container3">
                          <div className="mins">
                          {this.props.currentRestaurant["ready_in"]} min
                          </div>
                          <div className="walk">
                          ready for pickup
                          </div>

                      </div>
                    </div> : 
                    <div className="inner-box"> 
                      <div className="distance-container">
                          <div className="mins">
                          {distance} min
                          </div>
                          <div className="walk">
                          walk
                          </div>

                      </div>
                      <div className = "divider-line"></div>
                      <div className="distance-container2">
                          <div className="mins">
                          {this.props.currentRestaurant["ready_in"]} min
                          </div>
                          <div className="walk">
                          ready for pickup
                          </div>

                      </div>
                      </div>

                    }

                    <div className="save-container" >
                        <AiOutlineHeart onClick={()=>
                        
                        dispatch($.ajax({
                            method: 'POST',
                            url: 'api/saves',
                            data: {restaurant_id: this.props.currentRestaurant["id"], user_id: this.props.currentUser["id"]}
                        }))
                        
                    } size={18} className="restaurant-heart"/>
                        <div className= "restaurant-save">Save</div>
                        

                    </div>
                    <div className="star-list-container3">{this.props.currentRestaurant["number_of_ratings"]} ratings</div>
                    <div className="star-list-container">{starList}</div>
                    <div className="star-list-container2">{this.props.currentRestaurant["rating"]}</div>
                      </div>

                        {/* <GoLocation className= "flex-1"/>
                    

                    <div className="flex-2">{this.props.currentRestaurant["address_1"]}, {this.props.currentRestaurant["city"]}, {this.props.currentRestaurant["state"]}</div>
                    {distance=== 'NaN' ? <div></div> : <div>
                    <FaWalking size={18} className="walking-man"/>
                    <div className="distance">{distance} mins</div> </div>} */}
                    </div>
                    <div className="restaurantMenu">{this.renderItemList()}
                     <div className="bottom-div">
                         <div>Prices on this menu are set directly by the Merchant. Prices may differ between Delivery and Pickup.</div>
                        <br/>
                        <GoLocation size={20} color={'black'}/>
                        <div>{this.props.currentRestaurant["address_1"]}, {this.props.currentRestaurant["city"]}, {this.props.currentRestaurant["state"]}</div>
                         </div>
                    </div>
                    
                </div>
                <div className = "restaurantMenuContainer">
                    <Cart/>
                    
                </div>
                </div>
                
            </div>
        );
    }
}

export default RestaurantPage;

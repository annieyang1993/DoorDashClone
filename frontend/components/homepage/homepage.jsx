import * as APIUtil from '../../util/session_api_util';
import React from 'react';
import { Link } from 'react-router-dom';
import header from './../../../public/5452421.jpg';
import FooterContainer from '../footer/footer';
import SimpleMap from './map.jsx'
import SimpleMapLocation from './map-location.jsx'
import RestaurantListView from './restaurant_list_view.jsx'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import {BiSearch} from 'react-icons/bi'
import Geocode from "react-geocode";
import GoogleMapReact from 'google-map-react';
import {BiCurrentLocation} from 'react-icons/bi'
import {FaWalking} from 'react-icons/fa'
import {BsDot} from 'react-icons/bs'
import {AiFillStar, AiOutlineHeart, AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {ImMenu} from 'react-icons/im'
import { tupleTypeAnnotation } from '@babel/types';
import Carousel from './carousel.jsx'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

//<td class="headerImg"><%=image_tag("/coffeeHeaderImg.png", width: '100%', height: '600', padding: '0', margin: '0-auto', 'object-fit': 'cover')%></td>
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      locationBool: false,
      location: '', 
      restaurantListCount:0,
      restaurantList: [],
      tags: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }
  

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
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
        this.setState({locationBool: true})
        this.setState({location: {lat: lat, lng: lng}})
        this.renderMap();
        this.renderRestaurantList();
      },

      (error) => {
        alert("Please type in valid address")
        this.setState({locationBool: true})
      }
    );
    //
  }

  handleClick(e){
    e.preventDefault();
  }

  getLocation = async () =>{
      //this.setState({address: this.props.address["address_1"]+", "+this.props.address["city"]+", "+this.props.address["state"]})
      if (!(Object.keys(this.props.address).length===0)){
        const lat = this.props.address.latitude;
        const lng = this.props.address.longitude;
        const address = this.props.address.category
        this.props.updateUserLocation(this.props.currentUser.id, {category: address, latitude: lat, longitude: lng});
        
        this.props.receiveLocation({lat: lat, lng: lng});
        this.setState({locationBool: true})
        this.setState({location: {lat: Number(lat), lng: Number(lng)}})
        this.setState({address: this.props.address.category})
        this.renderMap();
        this.renderRestaurantList();
      } else{
        const location = await this.props.getLocation(this.props.currentUser["id"]);
        const lat = this.props.address.latitude;
        const lng = this.props.address.longitude;
        this.props.receiveLocation({lat: lat, lng: lng});
        this.setState({locationBool: true})
        this.setState({location: {lat: Number(lat), lng: Number(lng)}})
        this.setState({address: this.props.address.category})
        this.renderMap();
        this.renderRestaurantList();
        // Geocode.fromLatLng(lat, lng).then(
        //   (response) => {
        //     const address = response.results[0].formatted_address;
        //     this.setState({address: address})
        //   })
        this.setState({address: this.props.address.category})
      }
      
  }

  componentDidMount(){
    
    this.props.getAllRestaurants();
    this.getLocation();
  }
  


  renderMap() {
    var restaurantList = Object.values(this.props.restaurants)
    var restaurantCount = 0;
    var restaurantListShow = []
    var mapsRestaurantList = []
    var tag_address = this.props.address.category;
    
    restaurantList.map((element, i) => {
          var distance = this.getDistance(this.state.location, {lat: element["latitude"], lng: element["longitude"]})
          console.log(distance);
          var dollarSign = [];
          for (let i = 0; i<element["pricing"]; i++){
            dollarSign.push(<div className="dollar-sign">$</div>)
          }
          var tags_exist = true;
          var has_all_tags = false;
          var restaurant_tags = [];
          Object.values(element["tags"]).map((ele2, j)=>(
            restaurant_tags.push(ele2["tag"])
          )) 

          if (Object.keys(this.state.tags)===null){
            tags_exist = false;
            has_all_tags = true;
          }

           else if (tags_exist===true){
            if (Object.keys(this.state.tags).every((ele2, j)=>(
              restaurant_tags.includes(ele2)
            ))){
              has_all_tags = true;
            }
          }
          if (distance < 120 & has_all_tags===true){
            restaurantCount+=1;
          restaurantListShow.push(
          
          element
          )}})
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '95vh', width: '100%', zIndex: 0}}>
                <GoogleMapReact
                    className="GoogleMapReact"
                    bootstrapURLKeys={{ key: "AIzaSyC8Vo2NBMXdPDU3hpOyQutB4bFi3x6ziMU" }}
                    center={this.state.location}
                    zoom={13}
                >  
                         <AnyReactComponent
                        
                        lat={this.state.location.lat}
                        lng={this.state.location.lng}
                        text={<div className="markerTag">
                        <FaWalking size={40} color='black'/>
                            </div>} />
                {restaurantListShow.map((element, i)=>{

                    return(
                    <AnyReactComponent
                        key={i}
                        lat={element["latitude"]}
                        lng={element["longitude"]}
                        text={<div className="markerTag"><div className="markerText">{element["name"]}</div>
                        <Link to={`/api/restaurants/${element["id"]}`}>
                            <img className="markers" src="/marker-blue.png"/></Link>
                            </div>} />
                   
                    )
        })}  

                           
                    
                    
                </GoogleMapReact>
            </div>
        );
    }

  renderRestaurantList(){
    
    var restaurantList = Object.values(this.props.restaurants);
    var restaurantCount = 0;
    var restaurantListShow = []
    var mapsRestaurantList = []
    var tag_address = this.props.address.category;
    
    restaurantList.map((element, i) => {
          var distance = this.getDistance(this.state.location, {lat: element["latitude"], lng: element["longitude"]})
          console.log(distance);
          var dollarSign = [];
          for (let i = 0; i<element["pricing"]; i++){
            dollarSign.push(<div className="dollar-sign">$</div>)
          }
          var tags_exist = true;
          var has_all_tags = false;
          var restaurant_tags = [];
          Object.values(element["tags"]).map((ele2, j)=>(
            restaurant_tags.push(ele2["tag"])
          )) 

          if (Object.keys(this.state.tags)===null){
            tags_exist = false;
            has_all_tags = true;
          }

           else if (tags_exist===true){
            if (Object.keys(this.state.tags).every((ele2, j)=>(
              restaurant_tags.includes(ele2)
            ))){
              has_all_tags = true;
            }
          }
          if (distance < 120 & has_all_tags===true){
            restaurantCount+=1;
          mapsRestaurantList.push(element)
          restaurantListShow.push(
          
          <div>
            <li key={i} className="innerContainerList" >
            <Link className = "restaurantLinks" to={`/api/restaurants/${element["id"]}`}>
            <div className="images">
            <img className = "img1" src={element["img1"]}/>
            <img className="img2" src={element["img2"]} />
            </div>
              <div className="cafeName"> 
              {element["name"]} 
              <AiOutlineHeart className="ready-in"/>
              </div>
             
            <div className="cafeDescription">{dollarSign}</div>
            <BsDot className="cafeDescription"/>
            <div className= "cafeDescription2">
            {element["description"]}
              </div>
            <div className="ready-in">Ready in {element["ready_in"]} min</div>
            <div className="cafeAddress">
                        {/* <GoLocation className= "flex-1"/> */}
                    <div className="flex-rating-word">{element["rating"]}</div>
                    <AiFillStar className= "flex-star"/>
                    <div className="flex-rating">{element["number_of_ratings"]} ratings</div>
                    <FaWalking size={15} className="walking-man"/>
                    <div className="distance">{distance} mins</div>
                    </div>
            
            </Link>
          </li>
            <div className="grayLine"></div>
          </div>
          )}})
    
    return (
      <div>
 

     
      <ul className="restaurantContainerList"> 
      
      <div className="cafes-title">
        <div className="cafes-title-innerContainer">Cafes Near You ({restaurantListShow.length})</div>
      <div className="located-near">located near "{tag_address}"</div> </div>

      
      <div className="section-container">
                      
          

     
      <div className="coffee-container" >
            <div className="coffee-background">
            <img className = "coffee" onClick={()=>{
            var tags = this.state.tags;
            tags["coffee"] = 1;
            this.setState({tags: tags});
            this.renderRestaurantList();
            }}
            src={'/coffee-icon-official.png'}/>
            </div>
            <div className="coffee-text">
              Coffee
            </div>
          </div>


      
        <div className="tea-container">
          <div className="cake-background">
          <img className = "tea" onClick={()=>{
            var tags = this.state.tags;
            tags["tea"] = 1;
            this.setState({tags: tags})
          this.renderRestaurantList()}}
            src={'/tea-icon-official.png'}/>
          </div>
          <div className="tea-text">
          Tea
          </div>
        </div>

      
        <div className="bbt-container">
          <div className="bbt-background">
          <img className = "bbt" onClick={()=>{
            var tags = this.state.tags;
            tags["bbt"] = 1;
            this.setState({tags: tags})
          this.renderRestaurantList()}}
            src={'/bubble-tea-official-2.png'}/>
          </div>
          <div className="bbt-text">
          Boba
          </div>
        </div>


    
        <div className="cake-container">
          <div className="cake-background">
          <img className = "cake" onClick={()=>{
            var tags = this.state.tags;
            tags["dessert"] = 1;
            this.setState({tags: tags})
          this.renderRestaurantList()}}
            src={'/cake-icon-official.png'}/>
          </div>
          <div className="cake-text">
            
          Dessert
          </div>
        </div>

        <div className="alcohol-container">
          <div className="alcohol-background">
          <img className = "alcohol" onClick={()=>{
            var tags = this.state.tags;
            tags["alcohol"] = 1;
            this.setState({tags: tags})
          this.renderRestaurantList()}}
            src={'/alcoholic-icon-official.png'}/>
          </div>
          <div className="alcohol-text">
          Alcoholic
          </div>
        </div>

        </div>
        
      <div className="cafe-tags">
        <div className="tags">{tag_address}</div>
        {Object.keys(this.state.tags).map((ele, i)=>(
          <div className="tags"><AiOutlineClose size={10} className="close-tag" onClick={()=>{
            var tags = this.state.tags;
            delete tags[ele];
            this.setState({tags: tags});
          }}/> {ele}</div>
        ))}
         
      </div>
      
        
        {restaurantListShow}

        
            {restaurantCount===0 ? <div className= "enter-location">We're sorry, there are no cafes in your area.
            <div className = "enter-location-inner">We currently have cafes located in New York and San Francisco.</div></div> : <div></div>}
      </ul>
  
      </div>

    )

    this.setState({restaurantListCount: restaurantCount});

}

  render() {
    return (
      <div className="homePageContainer">
        
          <div className="homepage-inner-container">
            <div className = "homePageHeader">
                <div >
                <Link to="/" className="header-button" onClick={()=>{
                  this.props.logout(); this.props.clearCartItems(); this.props.clearState()}}><AiOutlineMenu color={'black'} size={20}/></Link></div>
                    <div className="numberofItems">{Object.values(this.props.cart).length === 0 ? <div><FaShoppingCart className = "shoppingCart" color={'white'} size={15}/> 0</div> : <div><FaShoppingCart className = "shoppingCart" color={'white'} size={15}/> {Object.values(this.props.cart).length}</div>}</div>
                <form onSubmit={this.handleSubmit} className="location">
                  <div className="location-input">
                    <BiSearch className="magnifying-glass" size={20}/>
              
                    <div className="location-input-text">
                    <input type="text"
                      value={this.state.address}
                      onChange={this.update('address')}
                      className="location-input-text-inner" 
                      placeholder="Enter Location"/>
                      </div>
                
                  </div>
                </form>
                    <img className="logo-home" src="/Drinkly-logo-official.png" onClick={()=>{window.location.href = "/#/homepage"}}/>
            </div>


            <div className="float-container">
            
                    
                    <div className="float-child-2">
          
                      

                      <div className="inner-float-child-1">
                        
                      {this.renderRestaurantList()}
                      
                    </div>
                    </div>
                    <div className="float-child-1">
                      {Object.keys(this.state.location).length === 0 ? 
                      
                      <SimpleMap/> : <div>{this.renderMap()}</div>}
                      </div>
                    

            </div>
       
          
          

          
          

          </div>
       
        
      </div>
    );
  }
}



export default HomePage;


import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {Link} from 'react-router-dom'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends React.Component {


    constructor(props) {
    super(props);
        this.state = {
        center: this.props.location,
        zoom: 14
        };
  }



    render() {
        var restaurantList = Object.values(this.props.restaurants)
  
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '95vh', width: '100%', zIndex: 0}}>
                <GoogleMapReact
                    className="GoogleMapReact"
                    bootstrapURLKeys={{ key: "AIzaSyC8Vo2NBMXdPDU3hpOyQutB4bFi3x6ziMU" }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                >  
                 
                {this.props.location === undefined ? <div></div> : restaurantList.map((element, i)=>{

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
}

import { connect } from 'react-redux';


const mapStateToProps = ({ session, entities: { users, restaurants, currentRestaurant, location} }) => {

    return {
        location: location,
        currentUser: users[session.id],
        restaurants: restaurants,
        currentRestaurant: currentRestaurant
    };
};

const mapDispatchToProps = dispatch => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SimpleMap);


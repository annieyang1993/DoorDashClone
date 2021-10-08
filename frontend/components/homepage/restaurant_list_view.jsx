
import React from 'react';
import { Link } from 'react-router-dom';

//<td class="headerImg"><%=image_tag("/coffeeHeaderImg.png", width: '100%', height: '600', padding: '0', margin: '0-auto', 'object-fit': 'cover')%></td>
class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
    }
    render(hello) {
        console.log("IM AT RESTAURANT LIST!")
        return(
            <div className="restaurantListContainer">{hello}</div>
        )
    };
}

export default RestaurantList
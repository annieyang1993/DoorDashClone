import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        };
    }

    // update(field) {
    //     return e => this.setState({
    //         [field]: e.currentTarget.value
    //     });
    // }

    // handleClick() {
    //     this.props.setModal(false);


    // }

    // addToCart(item){
    //     this.props.addItemToCart(item);
    // }
    
    // renderModal(){
    //     return(
    //         <div className="ModalView">
    //             <img className="exitButton" onClick={()=>this.handleClick()} src="/x.png"/>
    //                 <div className="currentItemName">{this.props.currentItem["name"]}</div>
    //             <div className="currentItemDescription">{this.props.currentItem["description"]}</div>
    //                 <img className = "itemPicture" src={this.props.currentItem["img"]===null?
    //                     `/FillerLogo.png` :
    //                 `/Partners/${this.props.currentItem["img"]}.png`}/>
                    
    //            <div className = "addToCartTag"
    //            onClick={()=>this.addToCart(this.props.currentItem)}>Add to Cart - ${this.props.currentItem["price"]}</div>
    //         </div>)
        
    // }
    handleClick() {
        this.props.clearCartItems();
        //this.props.setModal(true);
        //console.log(id);
        //const {currentItem} = this.props;
    }
    
    render() {
        var total = 0;
        Object.values(this.props.cart).forEach((e)=>{
            total+=e["item"]["price"]*e["quantity"];
        })
        console.log(total);
    
        if (Object.values(this.props.cart).length === 0){
            return (
                <div className="emptyCartDiv">
                    <img className="emptyCartImg" src="/foodIcon.png" />
                    <div className="emptyText">Your cart is empty
                        <div className="emptyText">Add items to get started</div>
                    </div>
                    
                </div>
            );
        } else{
            var cartRestaurantId = Object.values(this.props.cart)[0]["item"]["restaurant_id"];
           
            return (<div>
                <div className="cartTitle">Your Order</div>
            <Link to="/thank-you" onClick={()=>this.handleClick()} className = "checkOut2"><div className="checkOut">Proceed to checkout 
               <div className="totalCost">Total - ${total}</div></div></Link>
               <ul> {console.log(Object.values(this.props.cart))}
                {Object.values(this.props.cart).map((element, i)=>(
                    <li className="itemsInCart" key={i}>
                        <div className = "itemCartName">  {element["item"]["item_name"]}</div>
                    <div className = "individualCost"> {element["quantity"]} x $ {element["item"]["price"]}</div></li>

               ))}

                    

            </ul>
            <div className="filler"></div>
                <div className="clearCart" onClick={()=>{this.handleClick()}}> Empty cart </div>
            
            </div>)
        }

    }
}

import { connect } from 'react-redux';
import { oneRestaurant, menu, getItem, modalStatus } from '../../actions/restaurant_actions';
import { addItemToCart, clearCartItems } from '../../actions/cart_actions';

const mapStateToProps = ({ session, entities: { users, restaurants, currentRestaurant, menu, currentItem, modalStatus, cart } }) => {
    return {
        location: users[location],
        currentUser: users[session.id],
        restaurants: restaurants,
        currentRestaurant: currentRestaurant,
        restaurantId: currentRestaurant["id"],
        menuList: menu,
        currentItem: currentItem,
        modalStatus: modalStatus,
        cart: cart
    };
};

const mapDispatchToProps = dispatch => ({
    getCurrentRestaurant: (restaurantId) => dispatch(oneRestaurant(restaurantId)),
    menu: (restaurantId) => dispatch(menu(restaurantId)),
    getItem: (restaurantId, itemId) => dispatch(getItem(restaurantId, itemId)),
    setModal: (bool) => dispatch(modalStatus(bool)),
    addItemToCart: (item) => dispatch(addItemToCart(item)),
    clearCartItems: ()=>dispatch(clearCartItems())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
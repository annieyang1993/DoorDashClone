import React from 'react';
import { Link } from 'react-router-dom';
import {GrSubtractCircle} from 'react-icons/gr'
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from 'react-icons/ai'
import {FaMinus} from 'react-icons/fa'

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            item: this.props.currentItem
        };
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleClick() {
        this.props.setModal(false);


    }

    addToCart(item){
       
    if (this.props.session["id"]===null){
        this.props.setModal(false);
        window.location.href = '/#/login'
    } else{
     if (Object.values(this.props.cart).length===0){
         
        this.props.addItemToCart({quantity: this.state.quantity, item: item});
     } else if (!(Object.values(this.props.cart)[0]["item"]["restaurant_id"]===this.props.restaurantId)){
          console.log("cart Id", (Object.values(this.props.cart)[0]["restaurant_id"]));
        console.log("restaurant id", this.props.restaurantId);
         alert("Your cart currently has items from another restaurant. Empty cart first to add items");
     } else{
          console.log("cart Id", (Object.values(this.props.cart)[0]["item"]["restaurant_id"]));
        console.log("restaurant id", this.props.restaurantId);
         this.props.addItemToCart({quantity: this.state.quantity, item: item});
     }
    }
    }

   

    
    renderModal(){
        return(
            <div className = "ModalBackground" onClick={()=>{
                this.setState({quantity: 1});
                this.handleClick()}}>
            <div id = "ModalView" className="ModalView" onClick={(e) => e.stopPropagation()}> 
                <img className="exitButton" onClick={()=>
                    {this.setState({quantity: 1}); 
                    this.handleClick()}} src="/x.png"/>
                <div className="ModalScrollView">
                    <div className="currentItemName">{this.props.currentItem["item_name"]}</div>
                <div className="currentItemDescription">{this.props.currentItem["item_description"]}</div>
                    <img className = "itemPicture" src={this.props.currentItem["img"]===null?
                        `/FillerLogo.png` :
                    `/Partners/${this.props.currentItem["img"]}.png`}/>
                </div>
                <div className = "bottomSection">
                <div className = "quantityTag">
                    <div className = {this.state.quantity<=1 ? "plus-gray" : "plus"}
                    onClick={()=>{
                        if (this.state.quantity>1){
                            this.setState({quantity: this.state.quantity-1})
                        }
                    }}> {this.state.quantity<=1 ? <AiOutlineMinusCircle color="gray"/> : <AiOutlineMinusCircle />}</div>
                    <div className = "quantity">{this.state.quantity}</div>
                    <div className = "minus" onClick={()=>{
                  
                            this.setState({quantity: this.state.quantity+1})
                        
                    }}><AiOutlinePlusCircle/></div>

                </div>
               <div className = "addToCartTag"
               onClick={()=>this.addToCart(this.props.currentItem)}>Add to Cart - ${this.props.currentItem["price"]}</div>
               </div>
            </div>
            </div>)
        
    }
    render() {

        return (
            <div className="modal">
                {this.props.modalStatus["modalStatus"]===true? this.renderModal() : <div></div>}
                
        
            </div>
        );
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
        cart: cart,
        session: session
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
)(Modal);
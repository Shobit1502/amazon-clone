import React,{useContext} from 'react'
import "./Checkout.css"
import Subtotal from "../Subtotal/Subtotal"
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct"
import {StateContext} from "../Context/StateProvider"

function Checkout() {
  const {state,dispatch}=useContext(StateContext);
    return (
        <div className="checkout">
          <div className="checkout__left">
          <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
          <h3>Hello, {state.user?state.user?.email:"Guest"}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {state.basket.map((item)=><CheckoutProduct key={item.id} id={item.id} price={item.price} rating={item.rating} title={item.title} image={item.image}/>)}

          </div>

          <div className="checkout__right">
            <Subtotal/>
          </div>
        </div>
    )
}

export default Checkout;

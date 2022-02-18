import React,{useContext} from 'react'
import './Product.css'
import {StateContext} from "../Context/StateProvider"
function Product({id,title,rating,price,image}) {
  const {state,dispatch}=useContext(StateContext);
  const addtoBasket=()=>{
    dispatch({
      type:"ADD_TO_BASKET",
      item:{
        id:id,
        title:title,
        rating:rating,
        price:price,
        image:image
      }
    })
  }
    return (
        <div className="product">
          <div className="product__info">
            <p>{title}</p>
            <p classname="product__price">
              <small>₹</small>
              <strong>{price}</strong>
            </p>
            <div className="product__rating">
            {  Array(rating).fill().map((_,i)=>
              (<p>⭐</p>)
            )}
            </div>
          </div>
          <img src={image} alt="" />
          <button onClick={addtoBasket} type="button">Add to Basket</button>
        </div>
    )
}

export default Product

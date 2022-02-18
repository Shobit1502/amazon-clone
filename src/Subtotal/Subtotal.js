import React,{useContext} from 'react'
import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format';
import {StateContext} from "../Context/StateProvider"
import { useNavigate } from 'react-router-dom';
function Subtotal() {
    const navigate=useNavigate();
    const {state,dispatch}=useContext(StateContext);
    return (
        <div className="subtotal">
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Subtotal ({state.basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                  <input type="checkbox" /> This order contains a gift
                </small>
              </>
            )}
            decimalScale={2}
            value={state.basket.reduce((total,value)=>(total+value.price),0)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
          <button onClick={(e) =>{navigate("/payement")}}>
          Proceed to Checkout
          </button>
        </div>
    )
}

export default Subtotal

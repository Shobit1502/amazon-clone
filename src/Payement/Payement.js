import React,{useState,useContext,useEffect} from 'react';
import "./Payement.css";
import {StateContext} from "../Context/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from 'react-currency-format';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "../axios";
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
function Payement() {
  const {state,dispatch}=useContext(StateContext);
  // const [succeeded, setSucceeded] = useState(false);
  // const [processing, setProcessing] = useState("");
  // const [clientSecret, setClientSecret] = useState(true);
  // const stripe = useStripe();
  // const elements = useElements();
  // const [error, setError] = useState(null);
  // const [disabled, setDisabled] = useState(true);
  // let navigate = useNavigate();
  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       url: `/payments/create?total=${state.basket.reduce((total,value)=>(total+value.price),0)}`
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };
  //   getClientSecret();
  // }, [state.basket]);
  // const handleChange=async (event)=>{
  //   event.preventDefault();
  //   setProcessing(true);
  //
  //   const payload = await stripe
  //     .confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement)
  //       }
  //     })
  //     .then(({ paymentIntent }) => {
  //       setSucceeded(true);
  //       setError(null);
  //       setProcessing(false);
  //       navigate("/orders");
  //     });
  // }
  // const handleSubmit=(event)=>{
  //   setDisabled(event.empty);
  //   setError(event.error ? event.error.message : "");
  // }
  const loadScript=(src)=>{
    return new Promise((resolve)=>{
      const script=document.createElement('script')
      script.src=src;
      script.onload=()=>{
        resolve(true)
      }
      script.onerror=()=>{
        resolve(false)
      }
      document.body.appendChild(script);
    })
  }
  const displayRazorpay=async (price)=>{
    const res=await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res){
      alert("Failed To load payement gateway");
      return;
    }
    const options={
      key: "rzp_test_A5oGGivLPW9DBM",

       // 2000 paise = INR 20, amount in paisa
      currency:"INR",
      amount: price*100,
      name:"Shobit's fake amazon",
      description:"Thanks for purchasing",
      handler:function(response){
        alert(response.razorpay_payment_id);
        alert("Payement is successful");
      },
      prefill:{
        name:"Shobit's fake amazon"
      }

    }
    const payementObject=new window.Razorpay(options);
    payementObject.open();
  }
    return (
        <div className="payement">
          <div className="payment__container">
            <h1>Checkout {<Link to="/checkout">{state.basket?.length} items</Link>}</h1>
            {/* payment section - delivery address */}
            <div className="payment__section">
              <div className="payment__title">
                <h3>Delivery Address</h3>
              </div>
              <div className="payment__address">
                <p>{state.user?.email}</p>
                <p>123 React Lane</p>
                <p>Punjab, India</p>
              </div>
        </div>
      {/* payment section - review item */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {state.basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>
      {/* payment section -payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">


              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={state.basket.reduce((total,value)=>(total+value.price),0)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={!(state.basket.reduce((total,value)=>(total+value.price),0)>0)} onClick={()=>{
                  const price=state.basket.reduce((total,value)=>(total+value.price),0);
                  displayRazorpay(price)
                }} >
                  <span>Pay Now</span>
                </button>
              </div>


          </div>
        </div>
      </div>
    </div>
    )
}

export default Payement

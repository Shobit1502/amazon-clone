import "./App.css";
import React,{useReducer,useEffect} from "react";
import Header from "./Header/Header.js";
import reducer,{initialState} from "./Context/reducer"
import Checkout from "./Checkout/Checkout"
import {StateContext} from "./Context/StateProvider";
import Login from "./Login/Login";
import Payement from "./Payement/Payement"
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Home/Home";
const stripePromise = loadStripe('pk_test_51KRc8oSJ8nXp4NR5Z3aNtlUMDlOKjbe2scbOmnXgauynD0xIBe3iiwVjoIwdnHqwIKyjmtbZnzLI7pXjQE2tDsKk0055qNwILR');
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {


          console.log(user);
          dispatch({
            type:'SET_USER',
            user:user
          })
          // ...
        } else {
          // User is signed out
          // ...
          dispatch({
            type:'SET_USER',
            user:null
          })
        }
      });

  }, [])
  return (
    <BrowserRouter>
      <StateContext.Provider value={{state,dispatch}}>
      <div className="app">
      <Header/>
      <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/payement" element={ <Payement />} />
          <Route path="/checkout" element={<Checkout/>} />
      </Routes>
      </div>
      </StateContext.Provider>
    </BrowserRouter>

  );
}

export default App;

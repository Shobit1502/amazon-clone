import React,{useState} from 'react'
import "./Login.css"
import { Link } from "react-router-dom";
import {auth} from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const signIn = (e) => {
      // preevent refreshing
      e.preventDefault();
      // some fancy firebase login here

      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      //console.log(user);
      navigate('/');

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  };
  const register = (e) => {
    e.preventDefault();
    // some firebase stuff
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      //console.log(user);
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });

  };
  return(<div className="login">
     <Link to="/">
       <img
         className="login__logo"
         src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
         alt="amazon logo"
       />
     </Link>
     <div className="login__container">
       <h1>Sign-in</h1>
       <form>
         <h5>Email</h5>
         <input
           type="text"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />
         <h5>Password</h5>
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
         <>
           <button
             className="login__signInButton"
             type="submit"
             onClick={signIn}
           >
             Sign In
           </button>
         </>
       </form>
       <p>
         By continuing, you agree to Amazon's Fake Clone Conditions of Use and
         Privacy Notice.
       </p>
       <button onClick={register} className="login__registerButton">
         Create Your Amazon Account
       </button>
     </div>
   </div>);
}

export default Login

import { useState } from "react";
import Navbar from "./Navbar";
import DatePicker from "react-datepicker";

const  Home = () => {
  

    return (
        <>
        <div className="home">
            <h2>Welcome to our website!</h2>
            <h2>To use our application please <i>Sign in</i></h2>
            <h2>or <i>Sign up</i> if you don't have an account yet.</h2>
            <div className="home-img-div">
            <img className="home-img" src= "https://cdn-icons-png.freepik.com/256/4900/4900915.png?ga=GA1.1.754540635.1722609399&semt=ais_hybrid" alt="img"/>
            <img className="home-img" src= "https://cdn-icons-png.freepik.com/256/4900/4900927.png?ga=GA1.1.754540635.1722609399&semt=ais_hybrid" alt="img"/>

            </div>
           
        </div>
        </>
    );
}
 
export default Home;
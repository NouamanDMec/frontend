import React from 'react'
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import './footer.css'
const Footer = () => {
  return (
<>
<div className='footer'>
    <div className='container'>
       <div className='about'>
        <div className='logo'>
            <img src="./img/logo.png" alt="logo" />
        </div>
        <div className='detail'>
            <p>We are a team of students of ENSA-M that create high quality WebApp</p>
            <div className='icon'>
                <li><RiFacebookFill/></li>
                <li><AiOutlineInstagram/></li>
            </div>
        </div>
        </div> 
        <div className='account'>
            <h3>My Account</h3>
            <ul>
                <li>Account</li>
                <li>Order</li>
                <li>Cart</li>
                <li>Shipping</li>
                <li>Return</li>
            </ul>
        </div>
        <div className='page'>
            <ul>
            <h3>Pages</h3>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Terma & Conditions</li>
                <li>Return</li>
            </ul>
        </div>
    </div>

</div>
</>  )
}

export default Footer
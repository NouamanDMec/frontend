import React, { useState } from 'react';
import { FaTruckMoving } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CiLogin } from 'react-icons/ci';
import { useAuth0 } from '@auth0/auth0-react';
import { TbMessageChatbot } from "react-icons/tb";


import './nav.css';

export const Nav = ({ searchbtn }) => {
  const [search, setSearch] = useState();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className='free'>
        <div className='icon'>
          <FaTruckMoving />
        </div>
        <p> Free Shipping when shopping upto 1000$</p>
      </div>
      <div className='main_header'>
        <div className='container'>
          <div className='logo'>
            <img src='./img/logo.png' alt='logo'></img>
          </div>
          <div className='search_box'>
            <input
              type='text'
              value={search}
              placeholder='Enter The Product Name...'
              autoComplete='off'
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button onClick={() => searchbtn(search)}>Search</button>
          </div>
          <div className='icon'>
            {isAuthenticated && (
              <div className='account'>
                <div className='user_icon'>
                  <AiOutlineUser />
                </div>
                <p>Hello, {user.name}</p>
              </div>
            )}

            <div className='second_icon'>
              <Link to='/' className='link'>
                <AiOutlineHeart />
              </Link>
              <Link to='/cart' className='link'>
                <BsBagCheck />
              </Link>
              <Link to='/chatbot' className='link'>
                <TbMessageChatbot />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='header'>
        <div className='container'>
          <div className='nav'>
            <ul>
              <li>
                <Link to='/home' className='link'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/product' className='link'>
                  Product
                </Link>
              </li>
              <li>
                <Link to='/about' className='link'>
                  About
                </Link>
              </li>
              <li>
                <Link to='/contact' className='link'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
         {/* <div className='auth'>
             <Link to='/login' className='link'> <button >Login</button></Link>
            <Link to='/register' className='link'>
              <button>Signup</button>
            </Link>
          </div>*/}
        </div>
      </div>
    </>
  );
};

export default Nav;

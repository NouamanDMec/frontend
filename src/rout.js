import React from 'react'
import { Home } from './home'
import { Routes,Route } from 'react-router-dom'
import Product from './product'
import Cart from './cart'
import Register from './Register'
import Login from './Login'
import ChatbotComponent from './ChatbotComponent'
export const Rout = ({product, setProduct,detail,view,close, setClose,cart, setCart, addtocart}) => {
  return (
<>
<Routes>
    <Route path='/home' element={<Home detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart}/>}/>
    <Route path='/product' element={<Product product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart}/>}/>
    <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/> }/>
    <Route path="/register" element= { <Register/>} />
    <Route path="/" element= { <Login/>} />
    <Route path="/chatbot" element= { <ChatbotComponent/>} />
</Routes>
</>  )
}

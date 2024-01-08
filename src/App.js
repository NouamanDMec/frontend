import React, {useState,useEffect} from 'react'
import { Nav } from './nav'
import { Rout } from './rout';
import Footer from './footer';
import {BrowserRouter} from 'react-router-dom';
import Productdetail from './productdetail';
import { MayBeNavBar } from './MyNavBar/MayBeNavar';

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Ajoutez une logique pour vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  //add to cart
  const [cart, setCart]=useState([])
  //product detail
  const [close, setClose]=useState(false)
  const [detail,setDetail]=useState([])
  //filter product
  const [product, setProduct]=useState(Productdetail)
  const searchbtn = (product) =>
  {
    const change = Productdetail.filter((x) =>
    {
      return x.Cat === product
    })
    setProduct(change)
  }
  //product detail
  const view = (product) =>
  {
    setDetail([{...product}])
    setClose(true)
  }
  //add to cart
  
  const addtocart = (product) =>
  {
    
      const exist = cart.find((x) => 
    {
      return x.id === product.id 
    })
    if(exist)
    {
      alert("This product has already been added to the cart")
    }
    else
    {
      setCart([...cart, {...product, qty:1}])
      alert("product added to cart")
    }
  
    
  }

  return (
<>
<BrowserRouter>
<MayBeNavBar><Nav searchbtn={searchbtn}/></MayBeNavBar>

<Rout product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} cart={cart} setCart={setCart} addtocart={addtocart}/>
{/*<PrivateRoute path='/' component={Home}/>*/}
{/*<PrivateRoute
          path="/home"
          component={Home}
          isAuthenticated={isAuthenticated}
        />*/}
<MayBeNavBar><Footer/>
</MayBeNavBar>
</BrowserRouter>
</>  )
}

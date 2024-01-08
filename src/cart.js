import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();


  const [cartData, setCartData] = useState({
    id: 0,
    user: {},
    cartItems: [],
    totalPrice: 0.0,
    totalItem: 0,
    totalDiscountedPrice: 0,
    discount: 0,
});

      const [jwtToken, setJwtToken] = useState(null);

    
      useEffect(() => {
        const storedToken = localStorage.getItem('jwt');
    
        // Mettre à jour l'état avec le jeton récupéré
        setJwtToken(storedToken);
    
        // Effectuer la requête GET pour récupérer les données du panier
        const fetchCartData = async () => {
          try {
            const response = await axios.get('http://13.37.212.240:8081/api/cart/',
          
             {
              // Ajouter les en-têtes nécessaires, par exemple, le JWT
              headers: {
                Authorization: `Bearer ${storedToken}`, // Remplacez yourJWTToken par votre jeton JWT
              },
            });
    
            // Mettre à jour l'état avec les données du panier
            console.log("this is tooooekn .."+storedToken);
            console.log("this repooonse date ...: " );
            console.log( response.data);
            setCartData(response.data);
            console.log("cooooooooooooo");
            //alert(response.data.message);
            console.log("this is the data of our caaaart ....:" );
            console.log(cartData);

          } catch (error) {
            console.error(
              'Erreur lors de la récupération du panier :',
              error.response ? error.response.data : error.message
            );
          }
        };
    
        // Appeler la fonction fetchCartData
        fetchCartData();
      }, []);

    //incrementer la quantite
     // Incrementer la quantité dans cartData
  const incqty = (product) => {
    setCartData((prevData) => {
      const updatedCartItems = prevData.cartItems.map((curElm) =>
        curElm.product?.id === product.product.id
          ? { ...curElm, quantity: curElm.quantity + 1 }
          : curElm
      );
      const updatedTotalPrice = updatedCartItems.reduce(
        (price, item) => price + item.quantity * item.product.price,
        0
      );

      return {
        ...prevData,
        cartItems: updatedCartItems,
        totalItem: prevData.totalItem + 1,
        totalPrice: updatedTotalPrice,
      };
    });
  };
  
     // Décrémenter la quantité dans cartData
  const decqty = (product) => {
    setCartData((prevData) => {
      const updatedCartItems = prevData.cartItems.map((curElm) =>
        curElm.product?.id === product.product.id && curElm.quantity > 0
          ? { ...curElm, quantity: curElm.quantity - 1 }
          : curElm
      );
      const updatedTotalPrice = updatedCartItems.reduce(
        (price, item) => price + item.quantity * item.product.price,
        0
      );

      return {
        ...prevData,
        cartItems: updatedCartItems,
        totalItem: prevData.totalItem > 0 ? prevData.totalItem - 1 : 0,
        totalPrice: updatedTotalPrice,
      };
    });
  };
   // Supprimer un produit du panier
   const removeproduct = async (productId) => {
    try {
      
      console.log(productId);
      const storedToken = localStorage.getItem('jwt');
      console.log("voici jwt dans remooove product"+ storedToken);

      const response = await axios.delete(`http://13.37.212.240:8081/api/cart_items/${productId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // Vérifier le statut de la réponse
      if (response.data.status) {
        navigate("/cart", { replace: true });
        // Si le produit est supprimé avec succès, mettre à jour le panier dans l'état local
        setCartData((prevData) => {
          const updatedCartItems = prevData.cartItems.filter((item) => item.id !== productId);
          const updatedTotalPrice = updatedCartItems.reduce(
            (price, item) => price + item.quantity * item.product.price,
            0
          );

          return {
            ...prevData,
            cartItems: updatedCartItems,
            totalItem: prevData.totalItem > 0 ? prevData.totalItem - 1 : 0,
            totalPrice: updatedTotalPrice,
          };
        });
        
        


      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit du panier :', error.message);
    }
  };

 
  return (
   <>
   <div className='cartcontainer'>
    {
     cartData.cartItems.length ===0 &&
     ( <div className='emptycart'>
        <h2 className='empty'>Cart is empty</h2>
        <Link to='/product' className='emptycartbtn'>Shop Now</Link>
      </div> 
  ) }
    <div className='contant'>
        {
           cartData.cartItems.map((curElm) => 
           {
            return(
                <div className='cart_item' key={curElm.id}>
                   <div className='img_box'>
                      <img src={curElm.product.imageUrl} alt={curElm.product.title}/>
                   </div>
                   <div className='detail'>
                    <div className='info'>
                    <h4>{curElm.category}</h4>
                    <h3>{curElm.title}</h3>
                    <p>Price: ${curElm.price}</p>
                    <div className='qty'>
                        <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                        <input type='text' value={curElm.quantity}></input>
                        <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                    </div>
                    <h4 className='subtotal'>sub total: ${curElm.price * curElm.quantity}</h4>
                    </div>
                    <div className='close'>
                    <button onClick={() => removeproduct(curElm.id)}><AiOutlineClose/></button>
                    </div>
                   </div>
                </div>
            )
           }) 
        }
    </div>
    {
        cartData.cartItems.length >0 &&
        <>
           <h2 className='totalprice'> $ {cartData.totalPrice*4}</h2>
           <button className='checkout'>Checkout</button>
        </>
    }
   </div>
   </>
    )
}

export default Cart
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './cart.css';

const Cart = ({ cart, setCart }) => {
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
        const response = await axios.get('http://10.94.241.186:8081/api/cart/', {
          // Ajouter les en-têtes nécessaires, par exemple, le JWT
          headers: {
            Authorization: `Bearer ${storedToken}`, // Remplacez yourJWTToken par votre jeton JWT
          },
        });

        // Mettre à jour l'état avec les données du panier
        setCartData(response.data);

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

  return (
    <div>
      {/* Afficher les détails du panier dans votre composant */}
      <h2>Details du Panier</h2>
      <p>Total d'articles : {cartData.totalItem}</p>
      <p>Prix total : {cartData.totalPrice}</p>

      {/* Afficher la liste des articles du panier */}
      <h3>Articles dans le Panier</h3>
      <ul>
        {cartData.cartItems.map((item) => (
          <li key={item.id}>
            <p>Produit : {item.product.title}</p>
            <p>Quantité : {item.quantity}</p>
            <p>Prix : {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
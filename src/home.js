import React from 'react'
import {Link} from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { CiPercent } from 'react-icons/ci';
import {BiHeadphone } from 'react-icons/bi';
import Homeproduct from './homeproduct';
import { AiOutlineHeart, AiOutlineShoppingCart,AiOutlineClose} from 'react-icons/ai'; 
import {BsEye } from 'react-icons/bs';
import { useState,useEffect } from "react";
import axios from "axios";

import './home.css'

export const Home = ({detail,view,close,setClose, addtocart}) => {
    const [products, setProducts] = useState([]);
    const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    // Récupérer le jeton du localStorage
    const storedToken = localStorage.getItem('jwt');

    // Mettre à jour l'état avec le jeton récupéré
    setJwtToken(storedToken);
    console.log(storedToken)

    // Appeler l'API pour obtenir la liste des produits
    fetchProducts(storedToken);
  }, []);
  

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get('http://13.37.212.240:8081/api/products?category=all products&color=&minPrice=0&maxPrice=10000&minDisount=0&stock=null', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mettre à jour l'état avec la liste des produits
      setProducts(response.data);
      console.log("this is resonse data"+response.data);
      console.log("this is product infos..." + products);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error.response ? error.response.data : error.message);
    }
  };
  const filtterproduct = async (category) => {
    try {
      const response = await axios.get(
        `http://13.37.212.240:8081/api/products?category=${category}&color=&minPrice=0&maxPrice=10000&minDisount=0&stock=null`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des produits de la catégorie ${category}:`,
        error.response ? error.response.data : error.message
      );
    }
  };
    // Fonction pour ajouter un produit au panier
    const addToCart = async (productId) => {
        try {
          // Faites la requête POST à l'API
          const response = await axios.post(
            'http://13.37.212.240:8081/api/cart/add',
            {
              prodactId: productId, // Assurez-vous que le nom de la propriété correspond à ce que l'API attend
            },
            {
              // Ajoutez les en-têtes nécessaires, y compris le JWT
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
    
          // Affichez un message ou effectuez d'autres actions en fonction de la réponse
          alert(response.data.message);
        } catch (error) {
          console.error(
            'Erreur lors de l\'ajout du produit au panier :',
            error.response ? error.response.data : error.message
          );
    
          // Affichez un message d'erreur en cas d'échec
          alert('Erreur lors de l\'ajout du produit au panier');
        }
      };
    

  const AllProducts = async () => {
    fetchProducts(jwtToken);
  };
  return (
    <>
     { close ?  <div className='product_detail'>
        <div className='container'>
            <button onClick={() =>setClose(false)} className='closebtn'><AiOutlineClose /></button>
            {
               products.map((product) => 
               {
                return(
                    <div className='productbox'>
                        <div className='img-box'>
                        <img src={product.imageUrl} alt={product.title} />
                        </div>
                        <div className='detail'>
                        <h4>{product.brand}</h4>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <h3>{product.price} DH</h3>
                            <h3>{product.quantity}</h3>
                            <button onClick={() => addToCart (product.id)}>Add To Cart</button>
                        </div>
                    </div>
                )
               }) 
            }
            <div className='productbox'>

            </div>
        </div>
    </div> : null
   }
    <div className='top_banner'>
        <div className='container'>
            <div className='detail'>
                <h2>The Best Note Book Collection 2023</h2>
              
                <Link to='/product' className='link'>Shop Now<BsArrowRight/></Link>
            </div>
            <div className='img_box'>
                <img src='./img/l8.png' alt='sliderimg'></img>
            </div>
        </div>
    </div>
    <div className='product_type'>
        <div className='container'>
            <div className='box'>
                <div className='img_box'>
                    <img src='./img/glasses1.png' alt='l1'></img>
                </div>
                <div className='detail'>
                    <p>23 products</p>
                </div>
            </div>
            <div className='box'>
                <div className='img_box'>
                    <img src='./img/l9.png' alt='l2'></img>
                </div>
                <div className='detail'>
                    <p>10 products</p>
                </div>
            </div><div className='box'>
                <div className='img_box'>
                    <img src='./img/l11.png' alt='l3'></img>
                </div>
                <div className='detail'>
                    <p>20 products</p>
                </div>
            </div><div className='box'>
                <div className='img_box'>
                    <img src='./img/l10.png' alt='l4'></img>
                </div>
                <div className='detail'>
                    <p>18 products</p>
                </div>
            </div>
        </div>
    </div>
    <div className='about'>
        <div className='container'>
            <div className='box'>
                <div className='icon'>
                <FiTruck/>
                </div>
                <div className='detail'>
                    <h3>Free Shipping</h3>
                    <p>Order above 1000 DH</p>
                </div>
            </div>
            <div className='box'>
                <div className='icon'>
               <BsCurrencyDollar/>
                </div>
                <div className='detail'>
                    <h3>Return & Refund</h3>
                    <p>Money Back Gaurenty</p>
                </div>
            </div>
            <div className='box'>
                <div className='icon'>
                <CiPercent />
                </div>
                <div className='detail'>
                    <h3>Member Discount</h3>
                    <p>On every Order</p>
                </div>
            </div>
            <div className='box'>
                <div className='icon'>
                <BiHeadphone/>
                </div>
                <div className='detail'>
                   <h3>Customer Support</h3>
                   <p>Every Time Call Support</p>
                </div>
            </div>
        </div>
    </div>
    <div className='product'>
        <h2>Top Products</h2>
       <div className='container'>
        {
            products.map((curElm)=>
            {
                return(
                    <div className='box' key={curElm.id}>
                      <div className='img_box'>
                        <img src={curElm.imageUrl} alt={curElm.title}></img>
                        <div className='icon'>
                            <li onClick={() => addToCart (curElm.id)}><AiOutlineShoppingCart/></li>
                           { /*<li onClick={() => view (curElm)}><BsEye/></li>*/}
                            <li><AiOutlineHeart/></li>  
                        </div>
                        </div>  
                        <div className='detail'>
                            <p>{curElm.brand}</p>
                            <h3>{curElm.title}</h3>
                            <h4>{curElm.price} DH </h4>
                        </div>
                        </div>
                        
                    
                )
            })
        }
        </div> 
    </div>
    <div className='banner'>
        <div className='container'>
        <div className='detail'>
            <h4>LATEST TECHNOLOGY ADDED</h4>
            <h3>Eclipse Glasses 10.2 9th Gen - 2022</h3>
            <p>DH 986</p>
            <Link to='/product' className='link'>Shop Now <BsArrowRight/></Link>
        </div>
        <div className='img_box'>
          <img src='./img/l8.png' alt='sliderimg'></img>
        </div>
        </div>
        
    </div>
    </>
  )
}

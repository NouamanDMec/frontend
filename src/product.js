import Productdetail from './productdetail'
import { AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai'; 
import {BsEye } from 'react-icons/bs';
import './product.css'
import { AiOutlineClose } from "react-icons/ai";
import React, { useState,useEffect } from "react";
import axios from "axios";


const Product = ({product,setProduct,detail,view,close,setClose, addtocart}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProduct = (productId) => {
    // Find the selected product based on productId
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
  };
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
     <div className='products'>
     <h3># Products </h3>
     <p>Home . products</p>
        <div className='container'>
            <div className='filter'>
                <div className='categories'>
                    <ul>
                        <li onClick={()=>AllProducts()}>All Products</li>
                        <li onClick={()=>filtterproduct("lunette soleil")}>Sun Glasses</li>
                        <li onClick={()=>filtterproduct("lunette de vue")}>View Glasses</li>
                        <li onClick={()=>filtterproduct("Metal Frame")}>Metal Frame</li>
                        <li onClick={()=>filtterproduct("Eclipse Glasses")}>Eclipse Glasses</li>
                    </ul>
                </div>
            </div>
            <div className='productbox'>
                <div className='contant'>
                    {
                       products.map((product)=>
                       {
                        return(
                            <>
                           <div className='box' key={product.id}>
                      <div className='img_box'>
                        <img src={product.imageUrl} alt={product.title}></img>
                        {console.log(product.id)}
                        <div className='icon'>
                          
                            <li onClick={() => addToCart (product.id)}><AiOutlineShoppingCart/></li>
                            {/*<li onClick={() => view (product.id)}><BsEye/></li>*/}
                            <li ><AiOutlineHeart/></li>  
                        </div>
                        </div>  
                        <div className='detail'>
                            <p>{product.brand}</p>
                            <h3>{product.title}</h3>
                            <h4>{product.price} DH</h4>
                        </div>
                        </div>

                            </>
                        )
                       }) 
                    }
                </div>

            </div>
        </div>
     </div>
    </>
  )
}

export default Product
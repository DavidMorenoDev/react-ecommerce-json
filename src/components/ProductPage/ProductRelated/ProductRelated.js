import React, { useState, useMemo, useEffect } from "react";
import { useAuthContext } from "../../../context/authContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const ProductRelated = () => {

  const { products } = useFetch();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    getProduct();
  }
  , [params]);



  const getProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/products/?slug=${params.title}`
      );
      if (response.ok) {
        let product = await response.json();
        if (product.length === 0) {
          navigate("/error");
        } else {
          product = product[0];
          setProduct(product);
        }
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.log(error);
    }
  }





  const relatedProducts = useMemo(() => {
    return products
    //filter by category
      .filter((item) => item.category === product.category)
      .filter((item) => item.id !== product.id)
      .sort(() => Math.random() - Math.random())
      .slice(0, 4) 
  }
    , [products, product]);

  return (
    <>
      {
        relatedProducts
          .map((product) => (
              <div key={product.id} className="col-4">
              <Link to={isAuthenticated ? `/private/product/${product.slug}` : `/product/${product.slug}`}>
                <img src={product.img} alt={product.title} />
                <h4>{product.title}</h4>
                <p>{product.category}</p>
                <h5>{product.price}€</h5>
              </Link>
            </div>
          ))}
    </>
  );
};

export default ProductRelated;

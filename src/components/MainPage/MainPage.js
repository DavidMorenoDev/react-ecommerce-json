import React, {  useEffect } from "react";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";
import ProductItem from "../ProducItem/ProductItem";
import Navbar from "../Navbar/Navbar";
import { Container, Row, Col } from "react-bootstrap";

import useFavs from "../Hooks/useFavs";
import useCart from "../Hooks/useCart";
import useSearch from "../Hooks/useSearch";
import useFetch from "../Hooks/useFetch";
import useShare from "../Hooks/useShare";
import "./MainPage.css";
import Footer from "../Footer/Footer";

function MainPage() {
  
  /* Destructuring the useCart() and useSearch() hooks. */
  const {
    addToCart,
    addQuantity,
    substractQuantity,
    removeProduct,
    cart,
    totalPrice,
    totalQuantity,
  } = useCart();

  const { products } = useFetch();
  const { manageFav, favs } = useFavs();
  const { searchItem } = useSearch();
  const { manageShare } = useShare();


 


  //function to add the class item__added__background to the buy icon when the products are rendered if they are already in the cart. That way even if the page is refreshed, the icon will indicate that the product is already in the cart.
  useEffect(() => {
    if (cart) {
      cart.forEach((product) => {
        const cartIcon = document.querySelector(`[data-id="${product.id}"]`);
        if (cartIcon) cartIcon.classList.add("item__added__background");
      });
    }
  }, [cart, products]);

  //function to add the class fav__added__background to the buy icon when the products are rendered if they are already in favs. That way even if the page is refreshed, the icon will indicate that the product is already in favs.
  useEffect(() => {
    if (favs) {
      favs.forEach((fav) => {
        const favIcon = document.querySelector(`[fav-id="${fav.id}"]`);
        if (favIcon) favIcon.classList.add("fav__added__background");
      });
    }
  }, [favs, products]);

  const checkCart = () => {
    return cart.map((product) => (
      <ProductItem
        key={product.id}
        id={product.id}
        title={product.title}
        price={product.price}
        img={product.img}
        slug={product.slug}
        addQuantity={addQuantity}
        substractQuantity={substractQuantity}
        totalPrice={totalPrice}
        removeProduct={removeProduct}
        quantity={product.quantity}
      />
    ));
  };

  /* A ternary operator that checks if the length of the totalCart array is 0. If it is, it renders the
Cart component with the title 'Your cart is empty' and the totalPrice is 0. If the length of the
totalCart array is not 0, it renders the Cart component with the title '', the totalPrice is the
totalPrice of the cart, and the productItem is the result of the checkCart() function. */
  const ListLength = cart.length;
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="mainPage__wrapper">
        <div className="mainPage" id="mainPage">
          <Container>
            <Row>
              <Navbar
                SearchBar={true}
                isMainPage={true}
                IconsNavbar={true}
                manageChange={searchItem}
                totalQuantity={totalQuantity}
              />
            </Row>
          </Container>

          <Row>
            <Col xs="10" className="products__wrapper">
              <Products
                manageClick={addToCart}
                manageFav={manageFav}
                manageShare={manageShare}
                title={"All our desks"}
              />
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            {ListLength === 0 ? (
              <Cart
                title={"Your cart is empty."}
                totalPrice={0}
                emptyCartImg={
                  <img
                    className="empty__cart"
                    src="../../assets/img/empty_cart.png"
                    alt="Sad empty cart"
                  />
                }
              />
            ) : (
              <Cart
                title={""}
                totalPrice={totalPrice}
                productItem={checkCart()}
                checkoutBtn={true}
              />
            )}
          </Col>
        </Row>
      </div>

      <Footer />
    </Container>
  );
}

export default MainPage;

import Products from "./components/products/Products";
import Navbar from "./components/Navbar/Navbar";
import { commerce } from "./lib/commerce";
import { useEffect, useState } from "react";
import Cart from "./components/cart/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order,setOrder] = useState(null);
  const [errorMessage,setErrorMessage] = useState('');


  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId,newOrder) => {
    try{
      const inComingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);

      setOrder(inComingOrder);
      refreshCart()
    }catch(error){
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} handleAddToCart={handleAddToCart} />
          }
          exact
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          }
          exact
        />

        <Route path="/checkout" element={<Checkout
         cart={cart}
         order={order}
         onCaptureCheckout={handleCaptureCheckout}
          errorMessage={errorMessage}
          handleEmptyCart={handleEmptyCart}
          />} exact />
      </Routes>
    </Router>
  );
}

export default App;

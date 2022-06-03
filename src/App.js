import Products from "./components/products/Products";
import Navbar from "./components/Navbar/Navbar";
import {commerce} from './lib/commerce'
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId,quantity) => {
    const item = await commerce.cart.add(productId,quantity);
    setCart(item.cart)
  }

  useEffect(() => {
    
    fetchProducts()
    fetchCart()
  
  }, [])
  

  return (
    <div className="App">
    <Navbar totalItems={cart.total_items} />
      <Products products={products}  handleAddToCart={handleAddToCart}/>
    </div>
  );
}

export default App;

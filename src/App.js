import { useSelector } from "react-redux";

import Cart from "./components/cart/cart";
import Layout from "./components/layout/layout";
import Products from "./components/shop/products";

function App() {
  const uiVisible = useSelector((state) => state.ui.cartIsVisible);
  return (
    <Layout>
      {uiVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

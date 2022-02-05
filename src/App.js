import { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/cart/cart";
import Layout from "./components/layout/layout";
import Products from "./components/shop/products";
import Notification from "./components/UI/notification";
import { sendCartData } from "./store/cart.slice";

// import { uiActions } from "./store/ui.slice";

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "...sending",
    //       message: "Adding Item to your cart",
    //       title: "Sending item",
    //     })
    //   );
    //   const url =
    //     "https://task-form-project-default-rtdb.firebaseio.com/cart.json";
    //   const response = await fetch(url, {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Request to add item to cart failed!");
    //   }

    //   dispatch(
    //     uiActions.showNotification({
    //       title: "Cart Item Sent",
    //       message: "Item added to your cart successfully!",
    //       status: "success",
    //     })
    //   );
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));

    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       title: "Request Failed",
    //       message: "Attempt to add item to cart unsuccessful",
    //       status: "error",
    //     })
    //   );
    // });
  }, [cart, dispatch]);
  const uiVisible = useSelector((state) => state.ui.cartIsVisible);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {uiVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

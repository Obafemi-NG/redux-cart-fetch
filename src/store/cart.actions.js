import { uiActions } from "./ui.slice";
import { cartActions } from "./cart.slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const url =
        "https://task-form-project-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Attempt to load cart items failed!");
      }
      const data = response.json();
      return data;
    };
    try {
      const fetchedData = await fetchRequest();

      dispatch(
        cartActions.replaceCartItems({
          items: fetchedData.items || [],
          totalQuantity: fetchedData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Attempt Failed",
          message: "Attempt to fetch item from cart Failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending item to Cart",
      })
    );
    const sendRequest = async () => {
      const url =
        "https://task-form-project-default-rtdb.firebaseio.com/cart.json";
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Attempt to add item to cart failed!");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Item added to cart successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Attempt Failed",
          message: "Attempt to add item to cart Failed!",
        })
      );
    }
  };
};

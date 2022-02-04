import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui.slice";

import classes from "./cartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(uiActions.toggle());
  };
  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;

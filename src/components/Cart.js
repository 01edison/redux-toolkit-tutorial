import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import "./Cart.css";
const Cart = () => {
  const dispatch = useDispatch();

  const showCart = () => {
    dispatch(cartActions.setShowCart())
  };

  const quantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <div className="cartIcon" onClick={showCart}>
      <h3>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;

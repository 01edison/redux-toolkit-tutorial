import React from "react";
import Header from "./Header";
import Products from "./Products";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import "./Layout.css";
const Layout = () => {
  let total = 0;
  const itemsList = useSelector((state) => state.cart.itemsList);

  itemsList.forEach((item) => {
    total += item.totalPrice;
    console.log(total)
  });
  return (
    <React.Fragment>
      <div className="layout">
        <Header />
        <Products />
        <CartItems />
        <div className="total-price">
          <h3>Total: ${total}</h3>
          <button className="orderBtn">Place Order</button>
        </div>{" "}
      </div>
    </React.Fragment>
  );
};

export default Layout;
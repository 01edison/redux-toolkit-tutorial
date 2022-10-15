import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Auth from "./components/Auth";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/Notification";
import Layout from "./components/Layout";
let isFirstRender = true;
function ShoppingApp() {
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);
  

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request...",
          type: "warning",
        })
      );
      const res = await fetch(
        "https://redux-cart-app-66f25-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Request sent successfully",
          type: "success",
        })
      );
    };

    sendRequest().catch((e) => {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    });
  }, [cart]);
  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default ShoppingApp;

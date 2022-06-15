import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/slices/uiSlice";
import Notification from "./components/UI/Notification";
import { getRequest } from "./store/slices/cartActions";
import ProductForm from "./components/Shop/ProductForm";


function App() {
  const dispatch = useDispatch();
  const cartIsShow = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 7000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, dispatch]);

  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsShow && <Cart />}
        <ProductForm />

        <Products />
      </Layout>
    </>
  );
}

export default App;

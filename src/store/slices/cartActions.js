
import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";
import { BASE_URL } from "../../utils/constants/general";

export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending data o cart !",
      })
    );
    fetch(`${BASE_URL}/cart.json`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(cart),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sending cart data failed");
        }
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success !",
            message: "Sent cart data successfully !",
          })
        );
        return response.json();
      })
      .then((data) => {
        dispatch(getRequest())
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error !",
            message: "Sending cart data failed !",
          })
        );
      });
  };
};

export const getRequest = () => {
  return (dispatch) => {
    fetch(`${BASE_URL}/cart.json`)
      .then((response) => response.json())
      .then((data) => {
        let newData = [];
        for (let key in data) {
          newData.push({
            id: data[key].id,
            name: data[key].name,
            price: +data[key].price,
            description: data[key].description,
          });
        }
        dispatch(cartActions.addData(newData));
      });
  };
};

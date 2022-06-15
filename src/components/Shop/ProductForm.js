import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRequest, sendCartData } from "../../store/slices/cartActions";
import Card from "../UI/Card";

const ProductForm = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      id: Math.random().toString(),
      [e.target.name]: value,
    });
  };
  let formIsValid = false;
  if (
    data.name.trim().length > 1 &&
    data.price > 0 &&
    data.description.trim().length > 1
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendCartData(data));
    dispatch(getRequest());
    setData({
      name: "",
      price: "",
      description: "",
    });
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label htmlFor="name">Title</label>
            <input
              value={data.name}
              id="name"
              type="text"
              name="name"
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              value={data.description}
              id="description"
              type="text"
              name="description"
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              value={data.price}
              id="price"
              type="number"
              name="price"
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <button type="submit" disabled={!formIsValid}>
          Add item
        </button>
      </form>
    </Card>
  );
};

export default ProductForm;

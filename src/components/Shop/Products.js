import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const data = useSelector((state) => state.cart.loadedItems);

  return (
    <section className={classes.products}>
      {/* <h2>Buy your favorite products</h2> */}
      <h2>Data from getRequest</h2>
      <ul>
        {data.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

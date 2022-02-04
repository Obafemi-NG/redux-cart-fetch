import ProductItem from "./productItem";
import classes from "./products.module.css";

const DUMMY_DATA = [
  {
    id: "p1",
    title: "The first Product",
    price: 10,
    description: "This is my first product",
  },
  {
    id: "p2",
    title: "The second Product",
    price: 15,
    description: "This  is the second product",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

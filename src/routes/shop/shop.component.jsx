import { useContext } from "react";
import { PorudctsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-car/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(PorudctsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;

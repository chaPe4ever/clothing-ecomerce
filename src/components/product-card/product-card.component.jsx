import { useContext } from "react";
import Button from "../button/button.component.jsx";
import "./product-card.styles.jsx";
import { CartContext } from "../../contexts/cart.context.jsx";
import {
  Footer,
  Name,
  Price,
  ProductCartContainer,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;

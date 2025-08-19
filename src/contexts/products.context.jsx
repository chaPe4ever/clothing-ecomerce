import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

export const PorudctsContext = createContext({
  products: [],
});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products, setProducts };
  return (
    <PorudctsContext.Provider value={value}>
      {children}
    </PorudctsContext.Provider>
  );
};

export default ProductsProvider;

import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const ProductsProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  useEffect(() => {
    const getCategoriesMap = async () => {
      const catgegoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(catgegoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap: categoriesMap, setProducts: setCategoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default ProductsProvider;

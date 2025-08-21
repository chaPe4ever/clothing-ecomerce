import { createContext, useEffect, useReducer, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import { createAction } from "../utils/reducer/reducer.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP",
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
  }
};

const INITIAL_STATE = {
  categoriesMap: {},
};

const ProductsProvider = ({ children }) => {
  // const [categoriesMap, setCategoriesMap] = useState({});
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  const setCategoriesMap = (catgegoryMap) => {
    dispatch(
      createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, catgegoryMap)
    );
  };
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

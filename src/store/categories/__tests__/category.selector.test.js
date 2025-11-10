import {
  selectCategories,
  selectCategoriesMap,
  selectIsLoading,
} from "../categories.selector";

const mockState = {
  categories: {
    isLoading: false,
    categories: [
      {
        title: "mens",
        imageUrl: "test",
        items: [
          { id: 1, name: "Product1" },
          { id: 2, name: "Product2" },
        ],
      },
      {
        title: "womens",
        imageUrl: "test2",
        items: [
          { id: 3, name: "Product3" },
          { id: 4, name: "Product4" },
        ],
      },
    ],
  },
};

describe("Category selectors", () => {
  test("selectCategories should return the categoris data", () => {
    const categorisSlice = selectCategories(mockState);
    expect(categorisSlice).toEqual(mockState.categories.categories);
  });

  test("selectCategoriesIsLoading should return isLoading state", () => {
    const isLoading = selectIsLoading(mockState);

    expect(isLoading).toEqual(false);
  });

  test("selectCategoriesMap should convert the itemsarray into the appropriate map", () => {
    const expectedCategoriesMap = {
      mens: [
        { id: 1, name: "Product1" },
        { id: 2, name: "Product2" },
      ],
      womens: [
        { id: 3, name: "Product3" },
        { id: 4, name: "Product4" },
      ],
    };
    const categorisMap = selectCategoriesMap(mockState);
    expect(categorisMap).toEqual(expectedCategoriesMap);
  });
});

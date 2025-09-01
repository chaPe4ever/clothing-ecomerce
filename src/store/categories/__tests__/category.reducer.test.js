import {
  fetchCategoriesFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "../categories.action";
import { categoriesReducer, INITIAL_STATE } from "../categories.reducer";

describe("Category Reducer tests", () => {
  test("fetchCategoriesStart", () => {
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: true,
    };

    expect(categoriesReducer(INITIAL_STATE, fetchCategoriesStart())).toEqual(
      expectedState
    );
  });

  test("fetchCategiriesSuccesss", () => {
    const mockData = [
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
    ];

    const expectedState = {
      ...INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    };

    expect(
      categoriesReducer(INITIAL_STATE, fetchCategoriesSuccess(mockData))
    ).toEqual(expectedState);
  });

  test("fetchCategoriesFailed", () => {
    const mockError = new Error("Error fetching categories");
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: false,
      error: mockError,
    };

    expect(
      categoriesReducer(INITIAL_STATE, fetchCategoriesFailure(mockError))
    ).toEqual(expectedState);
  });
});

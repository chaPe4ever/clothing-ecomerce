import { testSaga, expectSaga } from "redux-saga-test-plan";

import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from "../categories.saga";
import { CATEGORIES_ACTION_TYPES } from "../categories.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} from "../categories.action";
import { call } from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

describe("Category sagas", () => {
  test("categirySaga", () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  test("onFetchCategories", () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  test("fetchCategoriesAsync success", () => {
    const mockCtegoriesArray = [
      { id: 1, name: "category 1" },
      { id: 2, name: "category 2" },
    ];
    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), mockCtegoriesArray]])
      .put(fetchCategoriesSuccess(mockCtegoriesArray))
      .run();
  });

  test("fetchCategoriesAsync failure", () => {
    const mockError = new Error("An error occured");

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
      .put(fetchCategoriesFailure(mockError))
      .run();
  });
});

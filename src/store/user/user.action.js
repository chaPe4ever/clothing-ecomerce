import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACCTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => {
  return createAction(USER_ACCTION_TYPES.SET_CURRENT_USER, user);
};

import { USER_ACTION_TYPES } from "./user.types";
import {
  AdditionalInformation,
  UserData,
} from "../../utils/firebase/firebase.utils";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { User } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  User
>;

export const setCurrentUser = withMatcher((user: User): SetCurrentUser => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
});

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export type EmailSignIngStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>;

export const emailSignInStart = (
  email: string,
  password: string
): EmailSignIngStart =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;

export const signInSuccess = withMatcher(
  (user: UserData & { id: string }): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILURE,
  FirebaseError | Error
>;

export const signInFailed = withMatcher(
  (error: FirebaseError | Error): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error)
);

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>;

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_START, {
      email,
      password,
      displayName,
    })
);

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  { user: User; additionalDetails: AdditionalInformation }
>;

export const signUpSuccess = withMatcher(
  (user: User, additionalDetails: AdditionalInformation): SignUpSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_FAILED,
  FirebaseError | Error
>;

export const signUpFailed = withMatcher(
  (error: FirebaseError | Error): SignUpFailed =>
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
);

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  FirebaseError | Error
>;

export const signOutFailed = withMatcher(
  (error: FirebaseError | Error): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

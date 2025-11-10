import { takeLatest, put, all, call } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutFailed,
  signOutSuccess,
  EmailSignIngStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action";

import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  isFirebaseError,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    const errorToPass = isFirebaseError(error)
      ? error
      : error instanceof Error
      ? error
      : new Error(String(error));
    yield* put(signInFailed(errorToPass));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignIngStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    if (isFirebaseError(error)) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("There was an incorrect password or email");
          break;
        case "auth/user-not-found":
          alert("The email given doesn't belong to a valid user");
          break;
        default:
          console.log(error);
      }
      yield* put(signInFailed(error));
    } else {
      // Handle non-Firebase errors
      const genericError =
        error instanceof Error ? error : new Error(String(error));
      console.log("Non-Firebase error occurred:", error);
      yield* put(signInFailed(genericError));
    }
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (userAuth) {
      yield* call(getSnapshotFromUserAuth, userAuth);
    }
  } catch (error) {
    const errorToPass = isFirebaseError(error)
      ? error
      : error instanceof Error
      ? error
      : new Error(String(error));
    yield* put(signInFailed(errorToPass));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    const errorToPass = isFirebaseError(error)
      ? error
      : error instanceof Error
      ? error
      : new Error(String(error));
    yield* put(signInFailed(errorToPass));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCreds = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCreds) {
      const { user } = userCreds;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    if (isFirebaseError(error)) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("User creation encountered an error", error);
      }
      yield* put(signUpFailed(error));
    } else {
      // Handle non-Firebase errors
      const genericError =
        error instanceof Error ? error : new Error(String(error));
      console.log("Non-Firebase error occurred during sign up:", error);
      yield* put(signUpFailed(genericError));
    }
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    const errorToPass = isFirebaseError(error)
      ? error
      : error instanceof Error
      ? error
      : new Error(String(error));
    yield* put(signOutFailed(errorToPass));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  onAuthStateChanged,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const sendRegistrationEmail = (email, configAttr) => {
  sendSignInLinkToEmail(auth, email, configAttr);
};

export const signInWithLinkInEmail = (email, windowloc) => {
  return signInWithEmailLink(auth, email, windowloc);
};

export const forgotPasswordLinkInEmail = (email, configAttr) => {
  return sendPasswordResetEmail(auth, email, configAttr);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const updateUserPassword = (user, newPassword) => {
  return updatePassword(user, newPassword);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

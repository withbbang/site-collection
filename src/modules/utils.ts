import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
  handleMessage,
  handleSetErrorBtn,
  handleSetIsErrorPopupActive,
} from 'middlewares/reduxToolkits/commonSlice';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';

export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APP_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export function handleSetCatchClause(
  dispatch: Dispatch<AnyAction>,
  error: any,
  cb?: () => void,
) {
  dispatch(handleMessage({ message: error.message }));
  dispatch(handleSetIsErrorPopupActive({ isErrorPopupActive: true }));
  dispatch(
    handleSetErrorBtn({
      callback: () => {
        dispatch(handleSetIsErrorPopupActive({ isErrorPopupActive: false }));
        dispatch(handleMessage({ message: '' }));
        cb?.();
      },
    }),
  );
}

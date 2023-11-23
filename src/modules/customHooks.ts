import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  handleSetCancelBtn,
  handleSetConfirmBtn,
  handleSetIsConfirmPopupActive,
  handleSetIsLoading,
  handleSetMessage,
} from 'middlewares/reduxToolkits/commonSlice';
import { handleSetUserInfo } from 'middlewares/reduxToolkits/userSlice';
import {
  handleCreateUserWithEmailAndPassword,
  handleEncryptValue,
  handleSetCatchClause,
  handleSignInWithEmailAndPassword,
} from './utils';
import { auth, db } from './configs';
import { TypeKeyValueForm } from './types';

/**
 * firebase documents 가져오기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {function} failCb 에러팝업 콜백
 * @returns
 */
export function useGetDocumentsHook(type: string, failCb?: () => any) {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<any[]>([]);
  const q = query(collection(db, type));

  useEffect(() => {
    (async () => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        const querySnapshot = await getDocs(q);
        setDocuments(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    })();
  }, [type, failCb]);

  const useGetDocuments = useCallback(
    async (type: string) => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        const querySnapshot = await getDocs(collection(db, type));
        setDocuments(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    },
    [type, failCb],
  );

  return { documents, useGetDocuments };
}

/**
 * firebase document 가져오기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {string} id firebase document id
 * @param {function} failCb 에러팝업 콜백
 * @returns
 */
export function useGetDocumentHook(
  type: string,
  id: string,
  failCb?: () => any,
) {
  const dispatch = useDispatch();
  const [document, setDocument] = useState<any>(null);
  const d = doc(db, type, id);

  useEffect(() => {
    (async () => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        const docSnapshot = await getDoc(d);

        if (docSnapshot !== undefined && docSnapshot.exists()) {
          setDocument(docSnapshot.data());
        }
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    })();
  }, [type, id, failCb]);

  const useGetDocument = useCallback(
    async (type: string, id: string) => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        const docSnapshot = await getDoc(doc(db, type, id));

        if (docSnapshot !== undefined && docSnapshot.exists()) {
          setDocument(docSnapshot.data());
        }
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    },
    [type, failCb],
  );

  return { document, useGetDocument };
}

/**
 * firebase document 생성하기 커스텀 훅
 * @param {function | undefined} failCb 에러팝업 콜백
 * @returns
 */
export function useAddDocumentHook(failCb?: () => any) {
  const dispatch = useDispatch();

  const useAddDocument = useCallback(
    async (type: string, params: any, successCb?: () => any) => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        const { id } = await addDoc(collection(db, type), params);
        successCb?.();
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    },
    [failCb],
  );

  return useAddDocument;
}

/**
 * firebase document 갱신하기 커스텀 훅
 * @param {function | undefined} failCb 에러팝업 콜백
 * @returns
 */
export function useUpdateDocumentHook(failCb?: () => any) {
  const dispatch = useDispatch();

  const useUpdateDocument = useCallback(
    async (type: string, id: string, params: any, successCb?: () => any) => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        await updateDoc(doc(db, type, id), params);
        successCb?.();
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    },
    [failCb],
  );

  return useUpdateDocument;
}

/**
 * firebase document 삭제하기 커스텀 훅
 * @param {function | undefined} failCb 에러팝업 콜백
 * @returns
 */
export function useDeleteDocumentHook(failCb?: () => any) {
  const dispatch = useDispatch();

  const useDeleteDocument = useCallback(
    async (type: string, id: string, successCb?: () => any) => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        await deleteDoc(doc(db, type, id));
        successCb?.();
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, failCb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    },
    [failCb],
  );

  return useDeleteDocument;
}

/**
 * 확인 팝업 설정
 * @param {function | undefined} cancelCb Cancel 클릭 시 콜백
 */
export function useSetConfirmPopup(cancelCb?: () => any) {
  const dispatch = useDispatch();

  const setConfirmPopup = useCallback(
    (message: string, confirmCb?: () => any) => {
      dispatch(handleSetMessage({ message }));
      dispatch(handleSetIsConfirmPopupActive({ isConfirmPopupActive: true }));
      dispatch(
        handleSetConfirmBtn({
          callback: () => {
            dispatch(
              handleSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
            );
            dispatch(handleSetMessage({ message: '' }));
            confirmCb?.();
          },
        }),
      );
      dispatch(
        handleSetCancelBtn({
          callback: () => {
            dispatch(
              handleSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
            );
            dispatch(handleSetMessage({ message: '' }));
            cancelCb?.();
          },
        }),
      );
    },
    [cancelCb],
  );

  return setConfirmPopup;
}

/**
 * input, textarea, select tag 커스텀 훅
 * @param {TypeKeyValueForm} keyValueForm key - value 객체
 * @returns
 */
export function useChangeHook(keyValueForm: TypeKeyValueForm) {
  const [form, setForm] = useState<TypeKeyValueForm>(keyValueForm);

  // email, password onChange 콜백 함수
  const useChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const { name, value } = e.target;

      setForm((prevState) => ({ ...prevState, [name]: value.trim() }));
    },
    [keyValueForm],
  );

  return { form, setForm, useChange };
}

/**
 * 엔터 눌렀을 때 특정 콜백이 동작하도록 하는 동작할 함수
 * @param {any} value 변하는 key - value 객체
 * @param {function} cb 엔터 눌렀을 때 콜백
 * @returns
 */
export function useEnterKeyDownHook(value: any, cb: () => any) {
  const useEnterKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.currentTarget.blur();
        cb();
      }
    },
    [value],
  );

  return useEnterKeyDown;
}

/**
 * 회원가입 유효성 검사, 회원가입 실행 함수
 * @param {TypeKeyValueForm} signUpForm sign up에 필요한 input 값들
 * @returns
 */
export function useSignUpHook(signUpForm: TypeKeyValueForm) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sign Up 버튼 콜백 함수
  const useSignUp = useCallback(async () => {
    dispatch(handleSetIsLoading({ isLoading: true }));
    try {
      if (!signUpForm.email) throw Error('Empty Email Field');
      if (!signUpForm.password) throw Error('Empty Password Field');

      const {
        user: { uid },
      } = await handleCreateUserWithEmailAndPassword(
        signUpForm.email as string,
        handleEncryptValue(signUpForm.password as string),
      );

      navigate('/sign/in', { replace: true });
    } catch (error: any) {
      handleSetCatchClause(dispatch, error);
    } finally {
      dispatch(handleSetIsLoading({ isLoading: false }));
    }
  }, [signUpForm]);

  return useSignUp;
}

/**
 * 로그인 유효성 검사, 로그인 실행 함수
 * @param {TypeKeyValueForm} signInForm sign in에 필요한 input 값들
 * @returns
 */
export function useSignInHook(signInForm: TypeKeyValueForm) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sign In 버튼 콜백 함수
  const useSignIn = useCallback(async () => {
    dispatch(handleSetIsLoading({ isLoading: true }));
    try {
      if (!signInForm.email) throw Error('Empty Email Field');
      if (!signInForm.password) throw Error('Empty Password Field');

      const {
        user: { uid },
      } = await handleSignInWithEmailAndPassword(
        signInForm.email as string,
        handleEncryptValue(signInForm.password as string),
      );

      dispatch(handleSetUserInfo({ uid, email: signInForm.email }));
      navigate('/', { replace: true });
    } catch (error: any) {
      handleSetCatchClause(dispatch, error);
    } finally {
      dispatch(handleSetIsLoading({ isLoading: false }));
    }
  }, [signInForm]);

  return useSignIn;
}

/**
 * 로그 아웃 함수
 * @returns
 */
export function useSignOutHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const useSignOut = useCallback(async () => {
    dispatch(handleSetIsLoading({ isLoading: true }));
    try {
      await signOut(auth);
      dispatch(handleSetUserInfo({ uid: '', email: '' }));
      navigate('/', { replace: true });
    } catch (error) {
      handleSetCatchClause(dispatch, error);
    } finally {
      dispatch(handleSetIsLoading({ isLoading: false }));
    }
  }, []);

  return useSignOut;
}

/**
 * 로그인 판단 여부 커스텀 훅
 * @param {boolean | undefined} uid 유저 고유 id
 * @param {boolean | undefined} isActiveErrorPopup 에러 팝업 노출시킬지 여부
 * @returns {boolean} 로그인 여부
 */
export function useAuthStateChangedHook(
  uid?: string,
  isActiveErrorPopup?: boolean,
): boolean {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(handleSetIsLoading({ isLoading: true }));
      if (user) setIsSignIn(true);
      else {
        setIsSignIn(false);
        if (isActiveErrorPopup) {
          handleSetCatchClause(dispatch, Error('Sign In Required'));
          throw Error('Sign In Required');
        }
      }
      dispatch(handleSetIsLoading({ isLoading: false }));
    });
  }, [uid]);

  return isSignIn;
}

export function useSetIsActivePopup() {
  const [isActivePopup, setIsActivePopup] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [xPos, setXPos] = useState<number | undefined>();
  const [yPos, setYPos] = useState<number | undefined>();

  const useClickComponent = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, id?: string) => {
      setXPos(e.clientX);
      setYPos(e.clientY);
      setSelectedId(id);
      setIsActivePopup(!isActivePopup);
    },
    [isActivePopup, selectedId, xPos, yPos],
  );

  return { isActivePopup, selectedId, xPos, yPos, useClickComponent };
}

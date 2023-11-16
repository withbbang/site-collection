import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import {
  handleSetCancelBtn,
  handleSetConfirmBtn,
  handleSetIsConfirmPopupActive,
  handleSetIsLoading,
  handleSetMessage,
  handleSetUserInfo,
} from 'middlewares/reduxToolkits/commonSlice';
import {
  handleCreateUserWithEmailAndPassword,
  handleEncryptValue,
  handleSetCatchClause,
  handleSignInWithEmailAndPassword,
} from './utils';
import { db } from './configs';
import { TypeInputForm } from './types';

/**
 * firebase documents 가져오기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useGetDocumentsHook(type: string, cb?: () => any) {
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState<any[]>([]);
  const q = query(collection(db, type));

  useEffect(() => {
    (async () => {
      try {
        dispatch(handleSetIsLoading({ isLoading: true }));
        const querySnapshot = await getDocs(q);
        setDocuments(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
      } catch (error: any) {
        handleSetCatchClause(dispatch, error, cb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    })();
  }, [type, cb]);

  return documents;
}

/**
 * firebase document 가져오기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {string} id firebase document id
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useGetDocumentHook(type: string, id: string, cb?: () => any) {
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
        handleSetCatchClause(dispatch, error, cb);
      } finally {
        dispatch(handleSetIsLoading({ isLoading: false }));
      }
    })();
  }, [type, id, cb]);

  return document;
}

/**
 * firebase document 생성하기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {any} params firebase document parameters
 * @param {function | undefined} successCb 성공 콜백
 * @param {function | undefined} faliCb 에러팝업 콜백
 * @returns
 */
export function useAddDocumentHook(
  type: string,
  params: any,
  successCb?: (id?: string) => any,
  faliCb?: () => any,
) {
  const dispatch = useDispatch();

  const useAddDocument = useCallback(async () => {
    try {
      dispatch(handleSetIsLoading({ isLoading: true }));
      const { id } = await addDoc(collection(db, type), params);
      successCb?.(id);
    } catch (error: any) {
      handleSetCatchClause(dispatch, error, faliCb);
    } finally {
      dispatch(handleSetIsLoading({ isLoading: false }));
    }
  }, [type, params, successCb, faliCb]);

  return useAddDocument;
}

/**
 * firebase document 갱신하기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {string} id firebase document id
 * @param {any} params firebase document parameters
 * @param {function | undefined} successCb 성공 콜백
 * @param {function | undefined} faliCb 에러팝업 콜백
 * @returns
 */
export function useUpdateDocumentHook(
  type: string,
  id: string,
  params: any,
  successCb?: () => any,
  faliCb?: () => any,
) {
  const dispatch = useDispatch();

  const useUpdateDocument = useCallback(async () => {
    try {
      dispatch(handleSetIsLoading({ isLoading: true }));
      await updateDoc(doc(db, type, id), params);
      successCb?.();
    } catch (error: any) {
      handleSetCatchClause(dispatch, error, faliCb);
    } finally {
      dispatch(handleSetIsLoading({ isLoading: false }));
    }
  }, [type, params, successCb, faliCb]);

  return useUpdateDocument;
}

/**
 * 확인 팝업 설정
 * @param {string} message 팝업에 띄울 메세지
 * @param {function} confirmCb OK 클릭 시 콜백
 * @param {function | undefined} cancelCb Cancel 클릭 시 콜백
 */
export function useSetConfirmPopup(
  message: string,
  confirmCb: () => any,
  cancelCb?: () => any,
) {
  const dispatch = useDispatch();

  const setConfirmPopup = useCallback(() => {
    dispatch(handleSetMessage({ message }));
    dispatch(handleSetIsConfirmPopupActive({ isConfirmPopupActive: true }));
    dispatch(
      handleSetConfirmBtn({
        callback: () => {
          dispatch(
            handleSetIsConfirmPopupActive({ isConfirmPopupActive: false }),
          );
          dispatch(handleSetMessage({ message: '' }));
          confirmCb();
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
  }, [message, confirmCb, cancelCb]);

  return setConfirmPopup;
}

export function useInputHook(inputForm: TypeInputForm) {
  const [form, setForm] = useState<TypeInputForm>(inputForm);

  // email, password onChange 콜백 함수
  const useInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prevState) => ({ ...prevState, [name]: value.trim() }));
    },
    [inputForm],
  );

  return { form, useInputChange };
}

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

export function useSignUpHook(signUpForm: TypeInputForm) {
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
        signUpForm.email,
        handleEncryptValue(signUpForm.password),
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

export function useSignInHook(signInForm: TypeInputForm) {
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
        signInForm.email,
        handleEncryptValue(signInForm.password),
      );

      handleSetUserInfo({ uid, email: signInForm.email });
      navigate('/', { replace: true });
    } catch (error: any) {
      handleSetCatchClause(dispatch, error);
    } finally {
      dispatch(handleSetIsLoading({ isLoading: false }));
    }
  }, [signInForm]);

  return useSignIn;
}

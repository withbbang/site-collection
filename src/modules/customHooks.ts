import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { handleSetIsLoading } from 'middlewares/reduxToolkits/commonSlice';
import { handleSetCatchClause } from './utils';
import { db } from './configs';

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

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { handleSetIsLoading } from 'middlewares/reduxToolkits/commonSlice';
import { handleSetCatchClause } from './utils';
import { db } from './configs';

/**
 * firebase documents 가져오기 커스텀 훅
 * @param {string} type firebase document attribute name
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function handleGetDocuments(type: string, cb?: () => void) {
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
export function handleGetDocument(type: string, id: string, cb?: () => void) {
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

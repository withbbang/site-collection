import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  useAddDocumentHook,
  useGetDocumentsHook,
  useUpdateDocumentHook,
} from 'modules/customHooks';
import IndexPT from './IndexPT';

function IndexCT({}: typeIndexCT): React.JSX.Element {
  const docs = useGetDocumentsHook('Links');
  const useAddDocument = useAddDocumentHook(
    'Links',
    { link: 'www.google.com' },
    () => console.log('successCb'),
  );
  const useUpdateDocument = useUpdateDocumentHook(
    'Links',
    '3VaxoKEqKAd67NkXUNFb',
    { link: 'https://www.google.com' },
    () => console.log('successCb'),
  );

  // 로그인 여부 판단 훅
  useEffect(() => {
    console.log(docs);
  }, [docs]);

  return <IndexPT onClick={useAddDocument} onupdate={useUpdateDocument} />;
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

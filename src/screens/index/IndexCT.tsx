import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  handleSetConfirmPopup,
  useAddDocumentHook,
  useGetDocumentsHook,
} from 'modules/customHooks';
import IndexPT from './IndexPT';

function IndexCT({}: typeIndexCT): React.JSX.Element {
  const docs = useGetDocumentsHook('Links');
  const useAddDocument = useAddDocumentHook(
    'Links',
    { URL: 'http://bread-diagrams.o-r.kr/' },
    () => console.log('successCb'),
  );
  const useSetConfirmPopup = handleSetConfirmPopup(
    'Really Do?',
    useAddDocument,
    () => console.log('click cancel'),
  );

  // 로그인 여부 판단 훅
  useEffect(() => {
    console.log(docs);
  }, [docs]);

  const onClick = () => {
    useSetConfirmPopup();
  };

  return <IndexPT onClick={onClick} />;
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

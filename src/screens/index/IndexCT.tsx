import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  useSetConfirmPopup,
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
  const handleConfirmPopup = useSetConfirmPopup(
    'Really Do?',
    useAddDocument,
    () => console.log('click cancel'),
  );

  useEffect(() => {
    console.log(docs);
  }, [docs]);

  const onClick = () => {
    handleConfirmPopup();
  };

  return <IndexPT onClick={onClick} />;
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

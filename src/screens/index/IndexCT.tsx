import React, { useEffect, useState } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { useAddDocumentHook, useGetDocumentsHook } from 'modules/customHooks';
import { handleSetConfirmPopup } from 'modules/utils';
import { useDispatch } from 'react-redux';
import IndexPT from './IndexPT';

function IndexCT({}: typeIndexCT): React.JSX.Element {
  const dispatch = useDispatch();
  const docs = useGetDocumentsHook('Links');
  const useAddDocument = useAddDocumentHook(
    'Links',
    { URL: 'https://www.github.com' },
    () => console.log('successCb'),
  );

  const onClick = () => {
    handleSetConfirmPopup(dispatch, 'Really Do?', useAddDocument, () =>
      console.log('click cancel'),
    );
  };

  // 로그인 여부 판단 훅
  useEffect(() => {
    console.log(docs);
  }, [docs]);

  return <IndexPT onClick={onClick} />;
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { useGetDocumentsHook } from 'modules/customHooks';
import IndexPT from './IndexPT';

function IndexCT({}: typeIndexCT): React.JSX.Element {
  const docs = useGetDocumentsHook('Links');

  // 로그인 여부 판단 훅
  useEffect(() => {
    console.log(docs);
  }, [docs]);

  return <IndexPT />;
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

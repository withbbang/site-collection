import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  useSetConfirmPopup,
  useAddDocumentHook,
  useGetDocumentsHook,
  useSignOutHook,
  useAuthStateChangedHook,
} from 'modules/customHooks';
import IndexPT from './IndexPT';

function IndexCT({ uid }: typeIndexCT): React.JSX.Element {
  //FIXME: 로그아웃해도 login 상태값으로 남아있는 현상 수정 필요
  const isSignIn = useAuthStateChangedHook(uid);
  const navigate = useNavigate();
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
  const useSignOut = useSignOutHook();

  const onClick = () => {
    handleConfirmPopup();
  };

  const handleSignOut = () => {
    useSignOut();
  };

  const handleSignIn = () => {
    navigate('/sign/in');
  };

  const handleSignUp = () => {
    navigate('/sign/up');
  };

  return (
    <IndexPT
      isSignIn={isSignIn}
      onClick={onClick}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
      onSignUp={handleSignUp}
    />
  );
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

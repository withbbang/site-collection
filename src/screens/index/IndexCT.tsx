import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  useSetConfirmPopup,
  useAddDocumentHook,
  useGetDocumentsHook,
  useSignOutHook,
  useAuthStateChangedHook,
  useDeleteDocumentHook,
} from 'modules/customHooks';
import { TypeCategory } from 'modules/types';
import IndexPT from './IndexPT';

function IndexCT({ uid }: typeIndexCT): React.JSX.Element {
  const navigate = useNavigate();

  const isSignIn = useAuthStateChangedHook(uid);
  const { documents: links, useGetDocuments } = useGetDocumentsHook('Links');
  // const categories: Array<TypeCategory> = useGetDocumentsHook('Categories');

  const useAddDocument = useAddDocumentHook(
    'Links',
    { URL: 'http://bread-diagrams.o-r.kr/' },
    () => console.log('successCb'),
  );
  const useDeleteDocument = useDeleteDocumentHook('Links', useGetDocuments);
  const handleDeletePopup = useSetConfirmPopup('Really Delete?', (id) =>
    useDeleteDocument(id),
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
      links={links}
      onClick={onClick}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
      onSignUp={handleSignUp}
      onDeleteDocument={handleDeletePopup}
    />
  );
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

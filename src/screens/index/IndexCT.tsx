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
  useSetIsActivePopup,
} from 'modules/customHooks';
import IndexPT from './IndexPT';

function IndexCT({ uid }: typeIndexCT): React.JSX.Element {
  const navigate = useNavigate();

  const isSignIn = useAuthStateChangedHook(uid);
  const { documents: links, useGetDocuments: useGetLinks } =
    useGetDocumentsHook('Links');
  const { documents: categories, useGetDocuments: useGetCategories } =
    useGetDocumentsHook('Categories');
  const {
    documents: degreeOfUnderstandings,
    useGetDocuments: useGetDegreeOfUnderstandings,
  } = useGetDocumentsHook('DegreeOfUnderstanding');

  const useAddDocument = useAddDocumentHook(
    'Links',
    { URL: 'http://bread-diagrams.o-r.kr/' },
    () => console.log('successCb'),
  );
  const useDeleteDocument = useDeleteDocumentHook('Links', useGetLinks);
  const handleDeletePopup = useSetConfirmPopup('Really Delete?', (id) =>
    useDeleteDocument(id),
  );
  const handleConfirmPopup = useSetConfirmPopup(
    'Really Do?',
    useAddDocument,
    () => console.log('click cancel'),
  );
  const useSignOut = useSignOutHook();
  const { isActivePopup, selectedId, xPos, yPos, useClickComponent } =
    useSetIsActivePopup();

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
      isActivePopup={isActivePopup}
      selectedId={selectedId}
      xPos={xPos}
      yPos={yPos}
      onClick={onClick}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
      onSignUp={handleSignUp}
      onDeleteDocument={handleDeletePopup}
      onClickCard={useClickComponent}
    />
  );
}

interface typeIndexCT extends CommonState {}

export default IndexCT;

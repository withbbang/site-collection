import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from 'middlewares/reduxToolkits/userSlice';
import {
  useSetConfirmPopupHook,
  useAddDocumentHook,
  useGetDocumentsHook,
  useSignOutHook,
  useAuthStateChangedHook,
  useDeleteDocumentHook,
  useSetIsActivePopupHook,
  useUpdateDocumentHook,
} from 'modules/customHooks';
import { TypeKeyValueForm } from 'modules/types';
import IndexPT from './IndexPT';

function IndexCT({ uid }: typeIndexCT): React.JSX.Element {
  const collectionName = 'Links';
  const navigate = useNavigate();
  const [popupType, setPopupType] = useState<string | undefined>();

  const isSignIn = useAuthStateChangedHook(uid);
  const useSignOut = useSignOutHook();

  const { documents: links, useGetDocuments: useGetLinks } =
    useGetDocumentsHook(collectionName);
  const { documents: degreeOfUnderstandings } = useGetDocumentsHook(
    'DegreeOfUnderstandings',
  );
  const { documents: categories } = useGetDocumentsHook('Categories');

  const useAddDocument = useAddDocumentHook(() => console.log('failCb'));
  const useUpdateDocument = useUpdateDocumentHook(() => console.log('failCb'));
  const useDeleteDocument = useDeleteDocumentHook(() => console.log('failCb'));
  const useSetConfirmPopup = useSetConfirmPopupHook(() =>
    console.log('click cancel'),
  );

  const { isActivePopup, selectedId, xPos, yPos, useClickComponent } =
    useSetIsActivePopupHook();

  const handleClickCard = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type?: string,
    id?: string,
  ) => {
    e.stopPropagation();
    setPopupType(type);
    useClickComponent(e, id);
  };

  const handleAddDocument = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    form: TypeKeyValueForm,
  ) => {
    useSetConfirmPopup('Really Add Document?', () => {
      useAddDocument(collectionName, { ...form, createDt: new Date() }, () => {
        useGetLinks(collectionName);
        useClickComponent(e);
      });
    });
  };

  const handleUpdateDocument = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    form: TypeKeyValueForm,
  ) => {
    e.stopPropagation();
    useSetConfirmPopup('Really Update Document?', () => {
      useUpdateDocument(
        collectionName,
        id,
        { ...form, updateDt: new Date() },
        () => {
          useGetLinks(collectionName);
          useClickComponent(e);
        },
      );
    });
  };

  const handleDeleteDocument = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    useSetConfirmPopup('Really Delete Document?', () => {
      useDeleteDocument(collectionName, id, () => useGetLinks(collectionName));
    });
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
      popupType={popupType}
      links={links}
      categories={categories}
      degreeOfUnderstandings={degreeOfUnderstandings}
      isActivePopup={isActivePopup}
      selectedId={selectedId}
      xPos={xPos}
      yPos={yPos}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
      onSignUp={handleSignUp}
      onAddDocument={handleAddDocument}
      onUpdateDocument={handleUpdateDocument}
      onDeleteDocument={handleDeleteDocument}
      onClickCard={handleClickCard}
    />
  );
}

interface typeIndexCT extends UserState {}

export default IndexCT;

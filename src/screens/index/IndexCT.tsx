import React, { useState } from 'react';
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
  useUpdateDocumentHook,
} from 'modules/customHooks';
import { TypeKeyValueForm } from 'modules/types';
import IndexPT from './IndexPT';

function IndexCT({ uid }: typeIndexCT): React.JSX.Element {
  const navigate = useNavigate();
  const [popupType, setPopupType] = useState<string | undefined>();

  const isSignIn = useAuthStateChangedHook(uid);
  const { documents: links, useGetDocuments: useGetLinks } =
    useGetDocumentsHook('Links');

  const useAddDocument = useAddDocumentHook(() => console.log('failCb'));
  const useUpdateDocument = useUpdateDocumentHook(() => console.log('failCb'));
  const useDeleteDocument = useDeleteDocumentHook(() => console.log('failCb'));
  const handleConfirmPopup = useSetConfirmPopup(() =>
    console.log('click cancel'),
  );
  const useSignOut = useSignOutHook();
  const { isActivePopup, selectedId, xPos, yPos, useClickComponent } =
    useSetIsActivePopup();

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
    handleConfirmPopup('Really Add Document?', () => {
      useAddDocument('Links', { ...form, createDt: new Date() }, () =>
        useGetLinks('Links'),
      );
    });
    useClickComponent(e);
  };

  const handleUpdateDocument = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    form: TypeKeyValueForm,
  ) => {
    e.stopPropagation();
    handleConfirmPopup('Really Update Document?', () => {
      useUpdateDocument('Links', id, { ...form, updateDt: new Date() }, () => {
        useGetLinks('Links');
        useClickComponent(e);
      });
    });
  };

  const handleDeleteDocument = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    handleConfirmPopup('Really Delete Document?', () => {
      useDeleteDocument('Links', id, () => useGetLinks('Links'));
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

interface typeIndexCT extends CommonState {}

export default IndexCT;

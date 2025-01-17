import React, { useEffect } from 'react';
import {
  TypeCategory,
  TypeDegreeOfUnderstanding,
  TypeKeyValueForm,
  TypeLink,
} from 'modules/types';
import { useChangeHook } from 'modules/customHooks';
import Select from 'components/select/Select';
import styles from './AddUpdateViewPopup.module.scss';

function AddUpdateViewPopup({
  isActive,
  popupType,
  xPos,
  yPos,
  link,
  categories,
  degreeOfUnderstandings,
  onClickCard,
  onAddDocument,
  onUpdateDocument,
}: TypeAddUpdateViewPopup): React.JSX.Element {
  const divRef = React.useRef(
    null,
  ) as React.MutableRefObject<HTMLDivElement | null>;
  const textAreaRef = React.useRef(
    null,
  ) as React.MutableRefObject<HTMLTextAreaElement | null>;

  const { form, setForm, useChange } = useChangeHook({
    title: '',
    url: '',
    description: ``,
    category: 0,
    degreeOfUnderstanding: 20,
    bookmark: 'N',
  });

  React.useEffect(() => {
    if (isActive) {
      handleActivePopup();
    } else {
      handleInActivePopup();
    }

    if (link) {
      const {
        title,
        url,
        description,
        category,
        degreeOfUnderstanding,
        bookmark,
      } = link;
      setForm({
        title,
        url,
        description,
        category,
        degreeOfUnderstanding,
        bookmark,
      });
    } else {
      setForm({
        title: '',
        url: '',
        description: ``,
        category: 0,
        degreeOfUnderstanding: 20,
        bookmark: 'N',
      });
    }
  }, [isActive, link]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [form.description]);

  // 팝업 활성
  const handleActivePopup = () => {
    document.body.style.overflow = 'hidden';

    if (divRef.current) {
      divRef.current.style.transition = 'none';
      divRef.current.style.left = `${xPos}px`;
      divRef.current.style.top = `${yPos}px`;
    }

    setTimeout(() => {
      if (divRef.current) {
        divRef.current.style.transition = 'all 0.5s';
        divRef.current.style.top = '50%';
        divRef.current.style.left = '50%';
        divRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 0);
  };

  // 팝업 비활성
  const handleInActivePopup = () => {
    document.body.style.overflow = 'unset';

    if (divRef.current) {
      divRef.current.style.top = `${yPos}px`;
      divRef.current.style.left = `${xPos}px`;
      divRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  };

  return (
    <>
      <div
        className={
          isActive
            ? [styles.background, styles.isActive].join(' ')
            : styles.background
        }
        onClick={(e) => onClickCard(e)}
      />
      <div
        className={
          popupType === 'view'
            ? [styles.modalBody, styles.viewMode].join(' ')
            : styles.modalBody
        }
        ref={divRef}
      >
        <div className={styles.content}>
          <label htmlFor="title">
            Title
            <br />
            <input
              id="title"
              name="title"
              value={`${form.title}`}
              onChange={useChange}
              disabled={popupType === 'view'}
            />
          </label>
        </div>
        <div className={styles.content}>
          <label htmlFor="url">
            URL
            <br />
            {popupType === 'view' ? (
              <a href={form.url as string} target="_blank" rel="noreferrer">
                {form.url}
              </a>
            ) : (
              <input
                className={styles.url}
                id="url"
                name="url"
                value={`${form.url}`}
                onChange={useChange}
                disabled={popupType === 'view'}
              />
            )}
          </label>
        </div>
        <div className={styles.contents}>
          <Select
            id="category"
            name="category"
            value={`${form.category}`}
            onChange={useChange}
            disabled={popupType === 'view'}
            contents={categories.map(({ category, description }) => ({
              value: category,
              description,
            }))}
          />
          <Select
            id="bookmark"
            name="bookmark"
            value={`${form.bookmark}`}
            onChange={useChange}
            disabled={popupType === 'view'}
            contents={[
              { value: 'N', description: 'N' },
              { value: 'Y', description: 'Y' },
            ]}
          />
        </div>
        <div className={styles.content}>
          <label htmlFor="description">
            Description
            <br />
            <textarea
              name="description"
              ref={textAreaRef}
              value={`${form.description}`}
              onChange={useChange}
              disabled={popupType === 'view'}
            />
          </label>
        </div>
        <div className={styles.contents}>
          <Select
            id="degree"
            name="degreeOfUnderstanding"
            value={`${form.degreeOfUnderstanding}`}
            onChange={useChange}
            disabled={popupType === 'view'}
            contents={degreeOfUnderstandings.map(({ grade, description }) => ({
              value: grade,
              description,
            }))}
          />
          <button
            onClick={(e) => {
              if (popupType === 'Add') onAddDocument(e, form);
              else if (popupType === 'Update' && link)
                onUpdateDocument(e, link.id, form);
              else onClickCard(e);
            }}
          >
            {popupType === 'view' ? 'OK' : popupType}
          </button>
        </div>
      </div>
    </>
  );
}

interface TypeAddUpdateViewPopup {
  isActive: boolean;
  popupType?: string;
  xPos?: number;
  yPos?: number;
  link?: TypeLink;
  categories: Array<TypeCategory>;
  degreeOfUnderstandings: Array<TypeDegreeOfUnderstanding>;
  onClickCard: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type?: string,
    id?: string | undefined,
  ) => void;
  onAddDocument: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    form: TypeKeyValueForm,
  ) => void;
  onUpdateDocument: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
    form: TypeKeyValueForm,
  ) => void;
}

AddUpdateViewPopup.defaultProps = {
  popupType: '',
  xPos: undefined,
  yPos: undefined,
  link: undefined,
};

export default AddUpdateViewPopup;

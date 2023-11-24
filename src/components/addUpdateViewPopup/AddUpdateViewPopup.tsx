import React from 'react';
import {
  TypeCategory,
  TypeDegreeOfUnderstanding,
  TypeKeyValueForm,
  TypeLink,
} from 'modules/types';
import { useChangeHook } from 'modules/customHooks';
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
  const ref = React.useRef(
    null,
  ) as React.MutableRefObject<HTMLDivElement | null>;

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

  // 팝업 활성
  const handleActivePopup = () => {
    document.body.style.position = 'fixed';

    if (ref.current) {
      ref.current.style.transition = 'none';
      ref.current.style.left = `${xPos}px`;
      ref.current.style.top = `${yPos}px`;
    }

    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transition = 'all 0.5s';
        ref.current.style.top = '50%';
        ref.current.style.left = '50%';
        ref.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 0);
  };

  // 팝업 비활성
  const handleInActivePopup = () => {
    document.body.style.position = 'unset';

    if (ref.current) {
      ref.current.style.top = `${yPos}px`;
      ref.current.style.left = `${xPos}px`;
      ref.current.style.transform = 'translate(-50%, -50%) scale(0)';
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
        ref={ref}
      >
        <div className={styles.content}>
          <label htmlFor="title">
            Title
            <br />
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={useChange}
            />
          </label>
        </div>
        <div className={styles.content}>
          <label htmlFor="url">
            URL
            <br />
            <input id="url" name="url" value={form.url} onChange={useChange} />
          </label>
        </div>
        <div className={styles.contents}>
          <label htmlFor="category">
            Category
            <br />
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={useChange}
            >
              {Array.isArray(categories) &&
                categories.length > 0 &&
                categories.map(({ id, category, description }) => (
                  <option key={id} value={+category}>
                    {description}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="bookmark">
            Bookmark
            <br />
            <select
              id="bookmark"
              name="bookmark"
              value={form.bookmark}
              onChange={useChange}
            >
              <option value="N">N</option>
              <option value="Y">Y</option>
            </select>
          </label>
        </div>
        <div className={styles.content}>
          <label htmlFor="description">
            Description
            <br />
            <textarea
              name="description"
              value={form.description}
              onChange={useChange}
            />
          </label>
        </div>
        <div className={styles.contents}>
          <label htmlFor="degreeOfUnderstanding">
            Degree
            <br />
            <select
              id="degreeOfUnderstanding"
              name="degreeOfUnderstanding"
              value={form.degreeOfUnderstanding}
              onChange={useChange}
            >
              DegreeOfUnderstanding
              {Array.isArray(degreeOfUnderstandings) &&
                degreeOfUnderstandings.length > 0 &&
                degreeOfUnderstandings.map(({ id, grade, description }) => (
                  <option key={id} value={+grade}>
                    {description}
                  </option>
                ))}
            </select>
          </label>
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

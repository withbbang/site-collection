import React from 'react';
import Card from 'components/card/Card';
import {
  TypeCategory,
  TypeDegreeOfUnderstanding,
  TypeKeyValueForm,
  TypeLink,
} from 'modules/types';
import AddUpdateViewPopup from 'components/addUpdateViewPopup/AddUpdateViewPopup';
import styles from './Index.module.scss';

function IndexPT({
  isSignIn,
  popupType,
  form,
  links,
  categories,
  degreeOfUnderstandings,
  isActivePopup,
  selectedId,
  xPos,
  yPos,
  onSignIn,
  onSignOut,
  onSignUp,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  onClickCard,
  onChange,
  onSearch,
}: typeIndexPT): React.JSX.Element {
  return (
    <>
      <AddUpdateViewPopup
        isActive={isActivePopup}
        xPos={xPos}
        yPos={yPos}
        popupType={popupType}
        link={links.filter((link) => link.id === selectedId)[0]}
        categories={categories}
        degreeOfUnderstandings={degreeOfUnderstandings}
        onClickCard={onClickCard}
        onAddDocument={onAddDocument}
        onUpdateDocument={onUpdateDocument}
      />
      <div className={styles.wrap}>
        <div className={styles.signBtns}>
          {/* <span onClick={onSearch}>
            <SVG type="search" width="30px" height="30px" />
          </span> */}
          {isSignIn ? (
            <button onClick={onSignOut}>Sign Out</button>
          ) : (
            <>
              <button onClick={onSignIn}>Sign In</button>
              {/* <button onClick={onSignUp}>Sign Up</button> */}
            </>
          )}
        </div>
        <h1>Site Link Collection</h1>
        <div
          className={
            isSignIn
              ? styles.conditionDiv
              : [styles.conditionDiv, styles.signInCondition].join(' ')
          }
        >
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={onChange}
            />
          </label>
          <label htmlFor="category">
            Category
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={onChange}
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
          {isSignIn && (
            <>
              <label htmlFor="degreeOfUnderstanding">
                Degree
                <select
                  id="degreeOfUnderstanding"
                  name="degreeOfUnderstanding"
                  value={form.degreeOfUnderstanding}
                  onChange={onChange}
                >
                  <option value="">All</option>
                  {Array.isArray(degreeOfUnderstandings) &&
                    degreeOfUnderstandings.length > 0 &&
                    degreeOfUnderstandings.map(({ id, grade, description }) => (
                      <option key={id} value={+grade}>
                        {description}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="bookmark">
                Bookmark
                <select
                  id="bookmark"
                  name="bookmark"
                  value={form.bookmark}
                  onChange={onChange}
                >
                  <option value="">All</option>
                  <option value="N">N</option>
                  <option value="Y">Y</option>
                </select>
              </label>
            </>
          )}
          <button onClick={onSearch}>Search</button>
        </div>
        <div className={styles.innerWrap}>
          {isSignIn && (
            <Card isSignIn={isSignIn} id="0" onClickCard={onClickCard} />
          )}
          {Array.isArray(links) &&
            links.length > 0 &&
            links.map(
              ({
                id,
                title,
                category,
                degreeOfUnderstanding,
                bookmark,
                createDt,
              }: TypeLink) => (
                <Card
                  isSignIn={isSignIn}
                  key={id}
                  id={id}
                  title={title}
                  category={category}
                  degreeOfUnderstanding={degreeOfUnderstanding}
                  bookmark={bookmark}
                  createDt={createDt}
                  categories={categories}
                  degreeOfUnderstandings={degreeOfUnderstandings}
                  onDeleteDocument={onDeleteDocument}
                  onClickCard={onClickCard}
                />
              ),
            )}
        </div>
      </div>
    </>
  );
}

interface typeIndexPT {
  isSignIn: boolean;
  popupType?: string;
  form: TypeKeyValueForm;
  links: Array<TypeLink>;
  categories: Array<TypeCategory>;
  degreeOfUnderstandings: Array<TypeDegreeOfUnderstanding>;
  isActivePopup: boolean;
  selectedId: string | undefined;
  xPos: number | undefined;
  yPos: number | undefined;
  onSignIn: () => void;
  onSignOut: () => void;
  onSignUp: () => void;
  // onDeleteDocument: (data: any) => void;
  onClickCard: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type?: string,
    id?: string,
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
  onDeleteDocument: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  onSearch: () => void;
}

IndexPT.defaultProps = {
  popupType: '',
};

export default IndexPT;

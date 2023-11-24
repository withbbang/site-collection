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
        <div className={styles.conditionDiv}></div>
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
}

IndexPT.defaultProps = {
  popupType: '',
};

export default IndexPT;

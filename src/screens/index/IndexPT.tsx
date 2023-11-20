import React from 'react';
import Card from 'components/card/Card';
import { TypeLink } from 'modules/types';
import AddUpdateViewPopup from 'components/addUpdateViewPopup/AddUpdateViewPopup';
import styles from './Index.module.scss';

function IndexPT({
  isSignIn,
  links,
  isActivePopup,
  xPos,
  yPos,
  onClick,
  onSignIn,
  onSignOut,
  onSignUp,
  onDeleteDocument,
  onClickCard,
}: typeIndexPT): React.JSX.Element {
  return (
    <>
      <AddUpdateViewPopup
        isActive={isActivePopup}
        xPos={xPos}
        yPos={yPos}
        onClick={onClickCard}
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
        <div className={styles.innerWrap}>
          {isSignIn && (
            <Card
              isSignIn={isSignIn}
              id="0"
              title=""
              url=""
              category=""
              degreeOfUnderstanding={20}
              bookmark=""
              createDt=""
              onDeleteDocument={onDeleteDocument}
              onClickCard={onClickCard}
            />
          )}
          {Array.isArray(links) &&
            links.length > 0 &&
            links.map(
              ({
                id,
                title,
                url,
                description,
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
                  url={url}
                  description={description}
                  category={category}
                  degreeOfUnderstanding={degreeOfUnderstanding}
                  bookmark={bookmark}
                  createDt={createDt}
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
  links: Array<TypeLink>;
  isActivePopup: boolean;
  xPos: number | undefined;
  yPos: number | undefined;
  onClick: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onSignUp: () => void;
  onDeleteDocument: (data: any) => void;
  onClickCard: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string | undefined,
  ) => void;
}

export default IndexPT;

import React from 'react';
import Card from 'components/card/Card';
import { TypeLink } from 'modules/types';
import styles from './Index.module.scss';

function IndexPT({
  isSignIn,
  links,
  onClick,
  onSignIn,
  onSignOut,
  onSignUp,
  onDeleteDocument,
}: typeIndexPT): React.JSX.Element {
  return (
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
              />
            ),
          )}
      </div>
    </div>
  );
}

interface typeIndexPT {
  isSignIn: boolean;
  links: Array<TypeLink>;
  onClick: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onSignUp: () => void;
  onDeleteDocument: (data: any) => void;
}

export default IndexPT;

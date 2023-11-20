import React from 'react';
import SVG from 'modules/SVG';
import { TypeLink } from 'modules/types';
import { handleConvertTimestamp } from 'modules/utils';
import styles from './Card.module.scss';

function Card({
  isSignIn,
  id,
  title,
  category,
  degreeOfUnderstanding,
  bookmark,
  createDt,
  onDeleteDocument,
}: TypeCard): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      {id === '0' ? (
        <span className={styles.add}>
          <SVG type="add" width="100px" height="100px" />
        </span>
      ) : (
        <>
          <div className={styles.floatCategory}>
            <span>
              <SVG type="category" width="20px" height="20px" />
              &nbsp;
              {category}
            </span>
          </div>
          {isSignIn && (
            <div className={styles.floatBtns}>
              <span>
                <SVG
                  type="bookmark"
                  width="20px"
                  height="20px"
                  fill={bookmark === 'Y' ? '#F4CF30' : '#000'}
                />
              </span>
              <span>
                <SVG type="modify" width="20px" height="20px" />
              </span>
              <span onClick={() => onDeleteDocument(id)}>
                <SVG type="trash" width="20px" height="20px" />
              </span>
            </div>
          )}
          <h3>{title}</h3>
          <div className={styles.cardInfo}>
            {isSignIn && (
              <span className={styles.degree}>
                <SVG type="degree" width="25px" height="25px" />
                &nbsp;&nbsp;{degreeOfUnderstanding}
              </span>
            )}
            <span>
              {createDt && (
                <>
                  <SVG type="time" width="20px" height="20px" />
                  &nbsp;{handleConvertTimestamp(createDt.toDate(), 'date')}
                </>
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

interface TypeCard extends TypeLink {
  isSignIn: boolean;
  onDeleteDocument: (data: any) => void;
}

export default Card;

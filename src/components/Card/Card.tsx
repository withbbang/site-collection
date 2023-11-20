import React from 'react';
import SVG from 'modules/SVG';
import { TypeLink } from 'modules/types';
import { handleConvertTimestamp, handleReturnDegree } from 'modules/utils';
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
  onClickCard,
}: TypeCard): React.JSX.Element {
  return (
    <div className={styles.wrap} onClick={(e) => onClickCard(e)}>
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
            <span className={styles.degree}>
              {isSignIn && (
                <>
                  <SVG type="degree" width="25px" height="25px" />
                  &nbsp;&nbsp;{handleReturnDegree(degreeOfUnderstanding)}
                </>
              )}
            </span>
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
  onClickCard: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id?: string | undefined,
  ) => void;
}

export default Card;

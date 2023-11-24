import React from 'react';
import {
  handleConvertTimestamp,
  handleRetrunCorrespondingDescription,
} from 'modules/utils';
import { TypeCategory, TypeDegreeOfUnderstanding } from 'modules/types';
import SVG from 'modules/SVG';
import styles from './Card.module.scss';

function Card({
  isSignIn,
  id,
  title,
  category,
  degreeOfUnderstanding,
  bookmark,
  createDt,
  categories,
  degreeOfUnderstandings,
  onDeleteDocument,
  onClickCard,
}: TypeCard): React.JSX.Element {
  return (
    <div
      className={styles.wrap}
      onClick={(e) => onClickCard(e, id === '0' ? 'Add' : 'view', id)}
    >
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
              {handleRetrunCorrespondingDescription(category, categories)}
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
              <span onClick={(e) => onClickCard(e, 'Update', id)}>
                <SVG type="modify" width="20px" height="20px" />
              </span>
              <span onClick={(e) => onDeleteDocument?.(e, id)}>
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
                  &nbsp;&nbsp;
                  {handleRetrunCorrespondingDescription(
                    degreeOfUnderstanding,
                    degreeOfUnderstandings,
                  )}
                </>
              )}
            </span>
            <span>
              {createDt && (
                <>
                  <SVG type="time" width="20px" height="20px" />
                  &nbsp;
                  {createDt &&
                    handleConvertTimestamp(createDt.toDate(), 'date')}
                </>
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

interface TypeCard {
  isSignIn: boolean;
  id: string;
  title?: string;
  category?: string;
  degreeOfUnderstanding?: string;
  bookmark?: string;
  createDt?: any;
  categories?: Array<TypeCategory>;
  degreeOfUnderstandings?: Array<TypeDegreeOfUnderstanding>;
  onDeleteDocument?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
  onClickCard: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    type?: string,
    id?: string | undefined,
  ) => void;
}

Card.defaultProps = {
  title: '',
  category: '',
  degreeOfUnderstanding: 20,
  bookmark: '',
  createDt: undefined,
  categories: undefined,
  degreeOfUnderstandings: undefined,
  onDeleteDocument: undefined,
};

export default Card;

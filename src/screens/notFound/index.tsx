import React from 'react';
import SVG from 'modules/SVG';
import Back from 'components/back/Back';
import styles from './NotFound.module.scss';

function NotFound(): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Back />
      <div className={styles.innerWrap}>
        <h1>Sorry This Page Is Not Found</h1>
        <span>
          <SVG type="notFound" width="500px" height="500px" />
        </span>
      </div>
    </div>
  );
}

export default NotFound;

import React from 'react';
import Loader from 'components/loader';
import styles from './Index.module.scss';

function IndexPT({}: typeIndexPT): React.JSX.Element {
  return (
    <>
      <Loader />
      <div className={styles.wrap}>
        <h1>Index Page</h1>
      </div>
    </>
  );
}

interface typeIndexPT {}

export default IndexPT;

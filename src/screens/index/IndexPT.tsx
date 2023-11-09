import React from 'react';
import styles from './Index.module.scss';

function IndexPT({ onClick }: typeIndexPT): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <h1>Index Page</h1>
      <button onClick={onClick}>Add</button>
    </div>
  );
}

interface typeIndexPT {
  onClick: () => void;
}

export default IndexPT;

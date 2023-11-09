import React from 'react';
import styles from './Index.module.scss';

function IndexPT({ onClick, onupdate }: typeIndexPT): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <h1>Index Page</h1>
      <button onClick={onClick}>useAddDocument test</button>
      <button onClick={onupdate}>useUpdateDocument test</button>
    </div>
  );
}

interface typeIndexPT {
  onClick: () => void;
  onupdate: () => void;
}

export default IndexPT;

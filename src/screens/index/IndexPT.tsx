import React from 'react';
import styles from './Index.module.scss';

function IndexPT({ onClick, onSignOut }: typeIndexPT): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <h1>Index Page</h1>
      <button onClick={onClick}>onClick</button>
      <button onClick={onSignOut}>signOut</button>
    </div>
  );
}

interface typeIndexPT {
  onClick: () => void;
  onSignOut: () => void;
}

export default IndexPT;

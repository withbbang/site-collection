import React from 'react';
import styles from './Index.module.scss';

function IndexPT({
  isSignIn,
  onClick,
  onSignIn,
  onSignOut,
  onSignUp,
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
      <h1>Index Page</h1>
      <button onClick={onClick}>onClick</button>
      <button onClick={onSignOut}>signOut</button>
    </div>
  );
}

interface typeIndexPT {
  isSignIn: boolean;
  onClick: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onSignUp: () => void;
}

export default IndexPT;

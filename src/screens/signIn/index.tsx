import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { useCheckValidSignIn } from 'modules/customHooks';
import SVG from 'modules/SVG';
import styles from './SignIn.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return { ...state.common };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function SignIn({ uid }: TypeSignIn): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useInputChange, useSignIn, useKeyDown } = useCheckValidSignIn({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      navigate('/', { replace: true });
    }
  }, [uid]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.backBtn}>
        <span onClick={handleBack}>
          <SVG type="back" width="30px" height="30px" />
        </span>
      </div>
      <div className={styles.innerWrap}>
        <h2>Sign In</h2>
        <div className={styles.inputDiv}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={useInputChange}
            onKeyDown={useKeyDown}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={useInputChange}
            onKeyDown={useKeyDown}
          />
        </div>
        <button onClick={useSignIn}>Sign In</button>
      </div>
    </div>
  );
}

interface TypeSignIn extends CommonState {}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

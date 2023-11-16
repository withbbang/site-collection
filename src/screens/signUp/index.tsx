import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useInputHook,
  useSignUpHook,
} from 'modules/customHooks';
import Back from 'components/back/Back';
import styles from './SignUp.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return { ...state.common };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function SignUp({ uid }: typeSignUp): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useInputChange } = useInputHook({ email: '', password: '' });
  const useSignUp = useSignUpHook(form);
  const useEnterKeyDown = useEnterKeyDownHook(form, useSignUp);

  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      navigate('/', { replace: true });
    }
  }, [uid]);

  return (
    <div className={styles.wrap}>
      <Back />
      <div className={styles.innerWrap}>
        <h2>Sign Up</h2>
        <div className={styles.inputDiv}>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={useInputChange}
            onKeyDown={useEnterKeyDown}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={useInputChange}
            onKeyDown={useEnterKeyDown}
          />
        </div>
        <button onClick={useSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

interface typeSignUp extends CommonState {}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

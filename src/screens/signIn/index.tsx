import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useInputHook,
  useSignInHook,
} from 'modules/customHooks';
import Back from 'components/back/Back';
import AuthInput from 'components/authInput/AuthInput';
import styles from './SignIn.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return { ...state.common };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function SignIn({ uid }: TypeSignIn): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useInputChange } = useInputHook({ email: '', password: '' });
  const useSignIn = useSignInHook(form);
  const useEnterKeyDown = useEnterKeyDownHook(form, useSignIn);

  useEffect(() => {
    if (uid !== undefined && uid !== null && uid !== '') {
      navigate('/', { replace: true });
    }
  }, [uid]);

  return (
    <div className={styles.wrap}>
      <Back />
      <div className={styles.innerWrap}>
        <h2>Sign In</h2>
        <AuthInput
          label={'email'}
          value={form.email}
          onChange={useInputChange}
          onKeyDown={useEnterKeyDown}
        />
        <AuthInput
          label={'password'}
          value={form.password}
          onChange={useInputChange}
          onKeyDown={useEnterKeyDown}
        />
        <button onClick={useSignIn}>Sign In</button>
      </div>
    </div>
  );
}

interface TypeSignIn extends CommonState {}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

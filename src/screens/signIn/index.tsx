import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { UserState } from 'middlewares/reduxToolkits/userSlice';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useChangeHook,
  useSignInHook,
} from 'modules/customHooks';
import Back from 'components/back/Back';
import AuthInput from 'components/authInput/AuthInput';
import styles from './SignIn.module.scss';

function mapStateToProps(state: PropState): UserState {
  return { ...state.user };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function SignIn({ uid }: TypeSignIn): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useChange } = useChangeHook({ email: '', password: '' });
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
          value={form.email as string}
          onChange={useChange}
          onKeyDown={useEnterKeyDown}
        />
        <AuthInput
          label={'password'}
          value={form.password as string}
          onChange={useChange}
          onKeyDown={useEnterKeyDown}
        />
        <button onClick={useSignIn}>Sign In</button>
      </div>
    </div>
  );
}

interface TypeSignIn extends UserState {}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

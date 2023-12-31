import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { UserState } from 'middlewares/reduxToolkits/userSlice';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useChangeHook,
  useSignUpHook,
} from 'modules/customHooks';
import Back from 'components/back/Back';
import AuthInput from 'components/authInput/AuthInput';
import styles from './SignUp.module.scss';

function mapStateToProps(state: PropState): UserState {
  return { ...state.user };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function SignUp({ uid }: TypeSignUp): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useChange } = useChangeHook({ email: '', password: '' });
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
        <button onClick={useSignUp}>Sign Up</button>
      </div>
    </div>
  );
}

interface TypeSignUp extends UserState {}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import {
  useEnterKeyDownHook,
  useInputHook,
  useSignUpHook,
} from 'modules/customHooks';
import Back from 'components/back/Back';
import styles from './SignUp.module.scss';

function SignUp(): React.JSX.Element {
  const uid = useSelector(({ uid }: CommonState) => uid);
  const navigate = useNavigate();
  const { form, useInputChange } = useInputHook({ email: '', password: '' });
  const { useSignUp } = useSignUpHook(form);
  const useEnterKeyDown = useEnterKeyDownHook(useSignUp);

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

export default SignUp;

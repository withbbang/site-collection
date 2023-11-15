import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { useCheckValidSignIn } from 'modules/customHooks';
import Back from 'components/back/Back';
import styles from './SignIn.module.scss';

function SignIn(): React.JSX.Element {
  const uid = useSelector(({ uid }: CommonState) => uid);
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

  return (
    <div className={styles.wrap}>
      <Back />
      <div className={styles.innerWrap}>
        <h2>Sign In</h2>
        <div className={styles.inputDiv}>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={useInputChange}
            onKeyDown={useKeyDown}
          />
        </div>
        <div className={styles.inputDiv}>
          <span>Password</span>
          <input
            type="password"
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

export default SignIn;

import React from 'react';
import { handleSetUpperCaseFirstCharacter } from 'modules/utils';
import styles from './AuthInput.module.scss';

function AuthInput({
  label,
  value,
  useInputChange,
  useEnterKeyDown,
}: TypeAuthInput): React.JSX.Element {
  return (
    <div className={styles.inputDiv}>
      <span>{handleSetUpperCaseFirstCharacter(label)}</span>
      <input
        name={label.toLowerCase()}
        type={label.toLowerCase()}
        value={value}
        onChange={useInputChange}
        onKeyDown={useEnterKeyDown}
      />
    </div>
  );
}

interface TypeAuthInput {
  label: string;
  value: string;
  useInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  useEnterKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default AuthInput;

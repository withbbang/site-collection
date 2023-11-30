import React from 'react';
import { handleSetUpperCaseFirstCharacter } from 'modules/utils';
import styles from './Select.module.scss';

function Option({ value, description }: any) {
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return <option value={value}>{description}</option>;
}

function Select({ id, name, value, onChange, disabled, contents, css }: any) {
  return (
    <label className={styles.label} htmlFor={id}>
      {handleSetUpperCaseFirstCharacter(id)}
      <select
        className={styles.select}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={css}
      >
        {Array.isArray(contents) &&
          contents.length > 0 &&
          contents.map(({ id, value, description }) => (
            <Option key={id} value={value} description={description} />
          ))}
      </select>
    </label>
  );
}

export default Select;

import React from 'react';
import { handleSetUpperCaseFirstCharacter } from 'modules/utils';
import styles from './Select.module.scss';

function Option({ value, description }: TypeOption) {
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return <option value={value}>{description}</option>;
}

function Select({ id, name, value, onChange, disabled, contents }: TypeSelect) {
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
      >
        {Array.isArray(contents) &&
          contents.length > 0 &&
          contents.map(({ value, description }) => (
            <Option key={value} value={value} description={description} />
          ))}
      </select>
    </label>
  );
}

interface TypeOption {
  value: number | string;
  description: string;
}

interface TypeSelect {
  id: string;
  name: string;
  value: number | string;
  disabled?: boolean;
  contents: Array<any>;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

Select.defaultProps = {
  disabled: undefined,
};

export default Select;

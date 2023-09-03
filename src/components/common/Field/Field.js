import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import cx from 'classnames';

import styles from './Field.module.scss';

function Field(props) {
  const {
    type = 'text',
    name,
    value,
    error,
    placeholder,
    onChange,
    onBlur,
    disabled,
    autoFocus,
    label,
    multiline,
    rowCount,
    isSingle
  } = props;

  const [id] = useState(nanoid());
  const attributes = { name, id, value, placeholder, onChange, onBlur, disabled, autoFocus };

  return (
    <div className={cx(styles.container, {[styles.containerSingle]: isSingle})}>
      <div className={styles.info}>
        { label && <label className={styles.label} htmlFor={id}>{ label }</label> }
        { error && <div className={styles.error}>{error}</div> }
      </div>
      { multiline
        ? <textarea className={cx(styles.field, {[styles.fieldInvalid]: error})} {...attributes} rows={rowCount} />
        : <input type={type} className={cx(styles.field, {[styles.fieldInvalid]: error})} {...attributes} />
      }
    </div>
  );
}

export default Field;

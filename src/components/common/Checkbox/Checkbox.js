import cx from 'classnames';

import styles from './Checkbox.module.scss';

function Checkbox(props) {
  const { value, label, handleChange, isUnderProcessing } = props;

  function handleLabelClick() {
    if (!isUnderProcessing) handleChange();
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={cx(styles.checkbox, {[styles.checkboxActive]: value})}
        onClick={handleChange}
        disabled={isUnderProcessing}
      />
      <label className={styles.label} onClick={handleLabelClick}>{ label }</label>
    </div>
  );
}

export default Checkbox;

import cx from 'classnames';

import styles from './Toggle.module.scss';

function Toggle(props) {
  const { options, activeOptionId, onChange } = props;

  function handleOptionClick(id) {
    if (id !== activeOptionId) onChange(id);
  }

  function renderOptions() {
    return options.map(curr => (
      <button
        key={curr.id}
        className={cx(styles.option, {[styles.optionActive]: curr.id === activeOptionId})}
        onClick={() => handleOptionClick(curr.id)}
      >
        { curr.label }
      </button>
    ));
  }

  return (
    <div className={styles.container}>
      { renderOptions() }
    </div>
  );
}

export default Toggle;

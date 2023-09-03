import cx from 'classnames';

import Loader from 'components/common/Loader/Loader';
import VARIANT from './constants/variant';
import styles from './Button.module.scss';

function Button(props) {
  const {
    children,
    type = 'submit',
    variant = VARIANT.main,
    extendingStyles = '',
    handleClick,
    isDisabled,
    isUnderProcessing
  } = props;

  return (
    <button
      type={type}
      className={cx(styles.btn, extendingStyles, styles[variant], {[styles.btnInProcessing]: isUnderProcessing})}
      onClick={handleClick}
      disabled={isDisabled || isUnderProcessing}
    >
      { isUnderProcessing
        ? <Loader extendingStyles={styles.btnLoader} />
        : children
      }
    </button>
  );
}

export { default as VARIANT } from './constants/variant';
export default Button;

import cx from 'classnames';

import Button, { VARIANT } from 'components/common/Button/Button';
import styles from './Error.module.scss';

function Error(props) {
  const { message, actionBtnText, handleAction, extendingStyles = '' } = props;

  return (
    <div className={cx(styles.container, extendingStyles)}>
      <div className={styles.message}>{ message }</div>
      { handleAction &&
        <Button type="button" variant={VARIANT.secondary} handleClick={handleAction}>
          { actionBtnText }
        </Button>
      }
    </div>
  );
}

export default Error;

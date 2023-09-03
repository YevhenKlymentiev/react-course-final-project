import cx from 'classnames';

import { ReactComponent as Icon } from 'assets/images/loader.svg';
import styles from './Loader.module.scss';

function Loader(props) {
  const { extendingStyles = '' } = props;

  return <Icon className={cx(styles.icon, extendingStyles)} />;
}

export default Loader;

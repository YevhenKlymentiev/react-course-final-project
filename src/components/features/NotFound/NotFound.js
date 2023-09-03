import { UI_TEXT } from 'constants/text';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <h2 className={styles.message}>
      { UI_TEXT.notFound }
    </h2>
  );
}

export default NotFound;

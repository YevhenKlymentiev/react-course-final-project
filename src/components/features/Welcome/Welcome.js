import { WELCOME_TEXT } from 'constants/text';
import styles from './Welcome.module.scss';

function Welcome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{ WELCOME_TEXT.title }</h1>
      <p className={styles.description}>{ WELCOME_TEXT.description }</p>
    </div>
  );
}

export default Welcome;

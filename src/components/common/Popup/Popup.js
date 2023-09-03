import { ReactComponent as CrossIcon } from 'assets/images/cross.svg';
import styles from './Popup.module.scss';

function Popup(props) {
  const { close, children } = props;

  return (
    <div className={ styles.container }>
      <div className={ styles.content }>
        <button type='button' className={styles.closeBtn} onClick={close}>
          <CrossIcon />
        </button>
        { children }
      </div>
    </div>
  );
}

export default Popup;

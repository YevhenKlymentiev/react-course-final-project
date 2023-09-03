import styles from './ViewMode.module.scss';

function ViewMode(props) {
  const { title, description, dateElem } = props;

  return (
    <div>
      <h2 className={styles.title}>
        { title }
        { dateElem }
      </h2>
      <p className={styles.description}>{ description }</p>
    </div>
  );
}

export default ViewMode;

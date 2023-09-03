import styles from './Form.module.scss';

function Form(props) {
  const { children, handleSubmit, title, error } = props;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.title}>
        { title }
      </h2>
      { error && <div className={styles.error}>{ error }</div> }
      { children }
    </form>
  );
}

export default Form;

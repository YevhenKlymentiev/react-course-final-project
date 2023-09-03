import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Field from 'components/common/Field/Field';
import Button, { VARIANT } from 'components/common/Button/Button';
import { REQUEST_STATUS } from 'constants/status';
import { CARD_TEXT } from 'constants/text';
import useFormHandler from 'hooks/useFormHandler';
import { cardsActions, createCardAsyncThunk } from 'store/slices/cards';
import { selectIsCreateCardProcessing, selectCreateCardError } from 'store/slices/cards/subslices/createCard';
import styles from './Form.module.scss';

const initFieldValues = {
  title: '',
  description: ''
};

function Form(props) {
  const { handleResult } = props;
  const dispatch = useDispatch();

  const isUnderProcessing = useSelector(selectIsCreateCardProcessing);
  const formError = useSelector(selectCreateCardError);
  const formErrorRef = useRef(formError);
        formErrorRef.current = formError;

  const {
    fieldValues,
    handleChange,
    isSubmitDisabled
  } = useFormHandler({ initFieldValues });

  useEffect(() =>
    () => {
      if (formErrorRef.current) dispatch(cardsActions.setCreateCardError(null));
    }, []
  );

  function handleSubmit(ev) {
    ev.preventDefault();

    dispatch(createCardAsyncThunk(fieldValues))
      .then(({ meta: { requestStatus }}) => {
        if (requestStatus === REQUEST_STATUS.fulfilled) handleResult();
      });
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Field
        name="title"
        value={fieldValues.title}
        onChange={handleChange}
        label={CARD_TEXT.title}
        autoFocus
      />
      <Field
        name="description"
        value={fieldValues.description}
        onChange={handleChange}
        label={CARD_TEXT.description}
        multiline
        rowCount={6}
      />
      { formError && <div className={styles.error}>{ formError }</div> }
      <div className={styles.btns}>
        <Button type="button" variant={VARIANT.common} handleClick={handleResult}>
          { CARD_TEXT.cancel }
        </Button>
        <Button
          extendingStyles={styles.createBtn}
          variant={VARIANT.main}
          handleClick={handleSubmit}
          isDisabled={isSubmitDisabled}
          isUnderProcessing={isUnderProcessing}
        >
          { CARD_TEXT.create }
        </Button>
      </div>
    </form>
  );
}

export default Form;

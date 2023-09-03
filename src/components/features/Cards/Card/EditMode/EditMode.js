import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Field from 'components/common/Field/Field';
import Button, { VARIANT } from 'components/common/Button/Button';
import { ASYNC_STATUS, REQUEST_STATUS } from 'constants/status';
import { CARD_TEXT } from 'constants/text';
import useFormHandler from 'hooks/useFormHandler';
import { cardsActions, updateCardAsyncThunk } from 'store/slices/cards';
import { selectUpdateCardProcessing, selectUpdateCardErrors } from 'store/slices/cards/subslices/updateCard';
import styles from './EditMode.module.scss';

function EditMode(props) {
  const { cardId, initFieldValues, close, dateElem } = props;
  const dispatch = useDispatch();

  const updateCardProcessing = useSelector(selectUpdateCardProcessing);
  const formError = useSelector(selectUpdateCardErrors)[cardId];
  const formErrorRef = useRef(formError);
        formErrorRef.current = formError;

  const {
    fieldValues,
    handleChange,
    isSubmitDisabled
  } = useFormHandler({ initFieldValues });

  useEffect(() =>
    () => {
      if (formErrorRef.current) dispatch(cardsActions.setUpdateCardError({ cardId, value: null }));
    },
    []
  );

  function handleSubmit(ev) {
    ev.preventDefault();

    dispatch(updateCardAsyncThunk({ cardId, fields: fieldValues }))
      .then(({ meta: { requestStatus }}) => {
        if (requestStatus === REQUEST_STATUS.fulfilled) close();
      });
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <Field
          name="title"
          value={fieldValues.title}
          onChange={handleChange}
          placeholder={CARD_TEXT.title}
          isSingle
        />
        { dateElem }
      </div>
      <Field
        name="description"
        value={fieldValues.description}
        onChange={handleChange}
        placeholder={CARD_TEXT.description}
        multiline
        rowCount={6}
      />
      <div className={styles.btns}>
        <Button type="button" variant={VARIANT.common} handleClick={close}>
          { CARD_TEXT.cancel }
        </Button>
        <Button
          extendingStyles={styles.saveBtn}
          variant={VARIANT.main}
          handleClick={handleSubmit}
          isDisabled={isSubmitDisabled}
          isUnderProcessing={updateCardProcessing[cardId] === ASYNC_STATUS.loading}
        >
          { CARD_TEXT.save }
        </Button>
      </div>
      { formError && <div className={styles.error}>{ formError }</div> }
    </form>
  );
}

export default EditMode;

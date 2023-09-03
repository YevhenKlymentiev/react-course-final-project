import { useState } from 'react';

export default function useFormHandler({ initFieldValues, validation, formError, removeFormError }) {
  const [fieldValues, setFieldValues] = useState(initFieldValues);
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(ev) {
    ev.preventDefault();

    const { value, name } = ev.target;

    if (formError) removeFormError();
    if (fieldErrors[name]) setFieldErrors(prevState => ({ ...prevState, [name]: null }));

    setFieldValues(prevState => ({ ...prevState, [name]: value }));
  }

  function handleBlur(ev, { isTrimmed } = {}) {
    const { value, name: fieldName } = ev.target;
    const fieldValue = isTrimmed ? value.trim() : value;

    validation[fieldName].some(currValidator => {
      const error = currValidator(fieldValue);

      if (error) {
        setFieldErrors(prevState => ({ ...prevState, [fieldName]: error }));

        return true;
      }
    });
  }

  const isFieldEmptyOrHasError = Object.keys(fieldValues).some(key => !fieldValues[key] || fieldErrors[key]);
  const isSubmitDisabled = isFieldEmptyOrHasError || formError;

  return { fieldValues, fieldErrors, handleChange, handleBlur, isSubmitDisabled };
}

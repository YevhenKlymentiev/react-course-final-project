import { useDispatch, useSelector } from 'react-redux';

import Form from 'components/common/Form/Form';
import Field from 'components/common/Field/Field';
import Button from 'components/common/Button/Button';
import { AUTH_TEXT } from 'constants/text';
import { required, minLength, maxLength } from 'helpers/validators';
import useFormHandler from 'hooks/useFormHandler';
import { authActions, signupAsyncThunk } from 'store/slices/auth';
import { selectSignupError, selectIsSignupProcessing } from 'store/slices/auth/subslices/signup';

const initFieldValues = {
  name: '',
  email: '',
  password: ''
};

const validation = {
  name: [required, minLength(4), maxLength(40)],
  email: [required, minLength(4), maxLength(40)],
  password: [required, minLength(4), maxLength(40)]
};

function Signup() {
  const dispatch = useDispatch();
  const formError = useSelector(selectSignupError);
  const isUnderProcessing = useSelector(selectIsSignupProcessing);
  const removeFormError = () => dispatch(authActions.setSignupError(null));
  const {
    fieldValues,
    fieldErrors,
    handleChange,
    handleBlur,
    isSubmitDisabled
  } = useFormHandler({ initFieldValues, validation, formError, removeFormError });

  function handleSubmit(ev) {
    ev.preventDefault();

    dispatch(signupAsyncThunk(fieldValues));
  }

  return (
    <Form handleSubmit={handleSubmit} title={AUTH_TEXT.signupTitle} error={formError}>
      <Field
        name="name"
        value={fieldValues.name}
        error={fieldErrors.name}
        onChange={handleChange}
        onBlur={ev => handleBlur(ev, { isTrimmed: true })}
        placeholder={AUTH_TEXT.name}
        disabled={isUnderProcessing}
      />
      <Field
        type="email"
        name="email"
        value={fieldValues.email}
        error={fieldErrors.email}
        onChange={handleChange}
        onBlur={ev => handleBlur(ev, { isTrimmed: true })}
        placeholder={AUTH_TEXT.email}
        disabled={isUnderProcessing}
      />
      <Field
        type="password"
        name="password"
        value={fieldValues.password}
        error={fieldErrors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={AUTH_TEXT.password}
        disabled={isUnderProcessing}
      />
      <Button handleClick={handleSubmit} isDisabled={isSubmitDisabled} isUnderProcessing={isUnderProcessing}>
        { AUTH_TEXT.signupBtn }
      </Button>
    </Form>
  );
}

export default Signup;

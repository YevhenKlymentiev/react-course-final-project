import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Form from 'components/common/Form/Form';
import Field from 'components/common/Field/Field';
import Spacer from 'components/common/Spacer/Spacer';
import Checkbox from 'components/common/Checkbox/Checkbox';
import Button from 'components/common/Button/Button';
import { REQUEST_STATUS } from 'constants/status';
import { AUTH_TEXT } from 'constants/text';
import useFormHandler from 'hooks/useFormHandler';
import { authActions, loginAsyncThunk } from 'store/slices/auth';
import { selectLoginError, selectIsLoginProcessing } from 'store/slices/auth/subslices/login';

const initFieldValues = {
  email: '',
  password: ''
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: navState } = useLocation();
  const formError = useSelector(selectLoginError);
  const isUnderProcessing = useSelector(selectIsLoginProcessing);
  const removeFormError = () => dispatch(authActions.setLoginError(null));
  const [isStayedLogged, setIsStayedLogged] = useState(false);
  const {
    fieldValues,
    handleChange,
    isSubmitDisabled
  } = useFormHandler({ initFieldValues, formError, removeFormError });

  function handleCheckboxChange() {
    setIsStayedLogged(prevState => !prevState);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    dispatch(loginAsyncThunk({ ...fieldValues, isStayedLogged }))
      .then(({ meta: { requestStatus }}) => {
        const requestedPath = navState?.requestedPath;

        if ((requestStatus === REQUEST_STATUS.fulfilled) && requestedPath) navigate(requestedPath);
      });
  }

  return (
    <Form handleSubmit={handleSubmit} title={AUTH_TEXT.loginTitle} error={formError}>
      <Field
        type="email"
        name="email"
        value={fieldValues.email}
        onChange={handleChange}
        placeholder={AUTH_TEXT.email}
        disabled={isUnderProcessing}
      />
      <Field
        type="password"
        name="password"
        value={fieldValues.password}
        onChange={handleChange}
        placeholder={AUTH_TEXT.password}
        disabled={isUnderProcessing}
      />
      <Spacer height={26} />
      <Checkbox label={AUTH_TEXT.rememberMe} value={isStayedLogged} handleChange={handleCheckboxChange} />
      <Button handleClick={handleSubmit} isDisabled={isSubmitDisabled} isUnderProcessing={isUnderProcessing}>
        { AUTH_TEXT.login }
      </Button>
    </Form>
  );
}

export default Login;

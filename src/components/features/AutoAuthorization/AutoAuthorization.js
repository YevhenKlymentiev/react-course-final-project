import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/common/Loader/Loader';
import Error from 'components/common/Error/Error';
import { ASYNC_STATUS } from 'constants/status';
import { AUTH_TEXT } from 'constants/text';
import { removeAuthData } from 'helpers/storage';
import { authActions, authorizeAsyncThunk } from 'store/slices/auth';
import { selectAuthorizeError, selectIsAuthorizeProcessing } from 'store/slices/auth/subslices/authorize';
import styles from './AutoAuthorization.module.scss';

function AutoAuthorization(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const isAuthorizeProcessing = useSelector(selectIsAuthorizeProcessing);
  const authorizeError = useSelector(selectAuthorizeError);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (accessToken) {
      dispatch(authorizeAsyncThunk(accessToken));
    } else {
      dispatch(authActions.setAuthorizeStatus(ASYNC_STATUS.idle));
    }
  }, []);

  function handleRemoveAuthData() {
    removeAuthData();
    dispatch(authActions.setAuthorizeError(null));
  }

  if (authorizeError) {
    return (
      <Error
        message={AUTH_TEXT.autoAuthError}
        actionBtnText={AUTH_TEXT.loginManually}
        handleAction={handleRemoveAuthData}
        extendingStyles={styles.appError}
      />
    );
  }

  if (isAuthorizeProcessing) return <Loader extendingStyles={styles.appLoader} />;

  return children;
}

export default AutoAuthorization;

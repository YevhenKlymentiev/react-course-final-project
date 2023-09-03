import { useState } from 'react';

import { mock } from './mock';
import styles from './DebugTool.module.scss';

function DebugTool() {
  const isErrorsEnabled = localStorage.getItem('withErrors');
  const [isErrorEnabled, setIsErrorEnabled] = useState(isErrorsEnabled);

  function clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.setItem('withErrors', isErrorEnabled);
    window.location.href = '/';
  }

  function loadMock() {
    localStorage.setItem('accessToken', mock.accessToken);
    localStorage.setItem('allCards', JSON.stringify(mock.allCards));
    localStorage.setItem('allUsers', JSON.stringify(mock.allUsers));
    window.location.href = '/';
  }

  function toggleErrors() {
    setIsErrorEnabled(prevState => !prevState);

    if (isErrorsEnabled) {
      localStorage.removeItem('withErrors');
    } else {
      localStorage.setItem('withErrors', 'true');
    }
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.btn} onClick={clearStorage}>
        Clear ALL data
      </button>
      <button type="button" className={styles.btn} onClick={loadMock}>
        Load Mock
      </button>
      <button type="button" className={styles.btn} onClick={toggleErrors}>
        {isErrorEnabled ? 'Disable errors' : 'Enable errors'}
      </button>
    </div>
  );
}

export default DebugTool;

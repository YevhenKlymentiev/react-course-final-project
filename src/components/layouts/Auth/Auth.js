import { Outlet } from 'react-router-dom';

import Welcome from 'components/features/Welcome/Welcome';
import styles from './Auth.module.scss';

function Auth() {
  return (
    <div className={styles.container}>
      <Welcome />
      <Outlet />
    </div>
  );
}

export default Auth;

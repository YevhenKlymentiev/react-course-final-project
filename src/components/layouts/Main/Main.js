import { Outlet } from 'react-router-dom';

import UserList from 'components/features/UserList/UserList';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <UserList />
      <Outlet />
    </div>
  );
}

export default Main;

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import Error from 'components/common/Error/Error';
import Loader from 'components/common/Loader/Loader';
import ROUTE_URL from 'constants/routeURL';
import { USER_LIST_TEXT } from 'constants/text';
import { getUsersAsyncThunk, reselectUserList } from 'store/slices/users';
import { selectGetUsersError, selectIsGetUsersLoading } from 'store/slices/users/subslices/getUsers';
import styles from './UserList.module.scss';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(reselectUserList);
  const isLoading = useSelector(selectIsGetUsersLoading);
  const error = useSelector(selectGetUsersError);

  function reloadUsers() {
    dispatch(getUsersAsyncThunk());
  }

  function renderList() {
    return users.map(curr =>
      <NavLink
        key={curr.id}
        to={`${ROUTE_URL.profile}/${curr.id}`}
        className={({isActive}) => cx(styles.link, {[styles.linkActive]: isActive})}
      >
        { curr.name }
      </NavLink>
    );
  }

  function renderContent() {
    if (error) {
      return (
        <Error
          message={USER_LIST_TEXT.getUsersError}
          actionBtnText={USER_LIST_TEXT.reloadUsers}
          handleAction={reloadUsers}
        />
      );
    }

    if (isLoading) return <Loader />;

    return (
      users.length
        ? renderList()
        : <div className={styles.systemMessage}>{ USER_LIST_TEXT.noUsers }</div>
    );
  }

  return (
    <div className={styles.container}>
      { renderContent() }
    </div>
  );
}

export default UserList;

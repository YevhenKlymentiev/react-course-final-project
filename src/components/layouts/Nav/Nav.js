import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import CreateCard from 'components/features/CreateCard/CreateCard';
import ROUTE_URL from 'constants/routeURL';
import { AUTH_TEXT, PROFILE_TEXT } from 'constants/text';
import { removeAuthData } from 'helpers/storage';
import { authActions, selectIsCurrentUserExist } from 'store/slices/auth';
import styles from './Nav.module.scss';

function Nav() {
  const dispatch = useDispatch();
  const isCurrentUserExist = useSelector(selectIsCurrentUserExist);
  const { pathname } = useLocation();

  function handleLogout() {
    removeAuthData();
    dispatch(authActions.logout());
  }

  function renderAuthNav() {
    if (pathname === ROUTE_URL.login) {
      return <Link to={ROUTE_URL.signup} className={styles.authLink}>{ AUTH_TEXT.signupLink }</Link>;
    }

    return <Link to={ROUTE_URL.login} className={styles.authLink}>{ AUTH_TEXT.login }</Link>;
  }

  function renderControls() {
    return (
      <>
        <Link to={ROUTE_URL.profile} className={styles.link}>{ PROFILE_TEXT.myProfile }</Link>
        <CreateCard />
        <button type="button" className={styles.authLink} onClick={handleLogout}>{ AUTH_TEXT.logout }</button>
      </>
    );
  }

  return isCurrentUserExist ? renderControls() : renderAuthNav();
}

export default Nav;

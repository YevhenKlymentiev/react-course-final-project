import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Protected from 'components/layouts/Protected/Protected';
import Redirection from 'components/common/Redirection/Redirection';
import Auth from 'components/layouts/Auth/Auth';
import Login from 'components/features/Login/Login';
import Signup from 'components/features/Signup/Signup';
import Main from 'components/layouts/Main/Main';
import Feed from 'components/features/Feed/Feed';
import Profile from 'components/features/Profile/Profile';
import NotFound from 'components/features/NotFound/NotFound';
import { selectIsCurrentUserExist } from 'store/slices/auth';
import ROUTE_URL from 'constants/routeURL';

function MainRoutes() {
  const isCurrentUserExist = useSelector(selectIsCurrentUserExist);

  return (
    <Routes>
      <Route element={<Protected hasAccess={!isCurrentUserExist} Fallback={<Redirection to={ROUTE_URL.feed} />} />}>
        <Route element={<Auth />}>
          <Route path={ROUTE_URL.login} element={<Login />} />
          <Route path={ROUTE_URL.signup} element={<Signup />} />
        </Route>
      </Route>
      <Route element={<Protected hasAccess={isCurrentUserExist} Fallback={<Redirection to={ROUTE_URL.login} />} />}>
        <Route index element={<Navigate to={ROUTE_URL.feed} />} />
        <Route element={<Main />}>
          <Route path={ROUTE_URL.feed} element={<Feed />} />
          <Route path={`${ROUTE_URL.profile}/${ROUTE_URL.dynamicUserId}?`} element={<Profile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;

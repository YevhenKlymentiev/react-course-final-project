import { Navigate, useLocation } from 'react-router-dom';

function Redirection(props) {
  const { to } = props;
  const { pathname } = useLocation();

  return <Navigate to={to} state={{ requestedPath: pathname }} />;
}

export default Redirection;

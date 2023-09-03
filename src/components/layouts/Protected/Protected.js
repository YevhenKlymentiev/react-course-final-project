import { Outlet } from 'react-router-dom';

function Protected(props) {
  const { hasAccess, Fallback } = props;

  if (!hasAccess) return Fallback;

  return <Outlet />;
}

export default Protected;

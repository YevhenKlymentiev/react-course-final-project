import { Link } from 'react-router-dom';

import Nav from 'components/layouts/Nav/Nav';
import ROUTE_URL from 'constants/routeURL';
import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.container}>
      <Link to={ROUTE_URL.root} className={styles.logo}><span>Magic</span>Cards</Link>
      <Nav />
    </div>
  );
}

export default Header;

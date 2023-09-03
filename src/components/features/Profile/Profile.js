import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Cards from 'components/features/Cards/Cards';
import { reselectCardsById } from 'store/slices/cards';
import { selectUserNameById } from 'store/slices/users';
import styles from './Profile.module.scss';

function Profile() {
  const { userId } = useParams();
  const cards = useSelector(state => reselectCardsById(state, userId));
  const profileName = useSelector(state => selectUserNameById(state, userId));

  return (
    <>
      <h1 className={styles.profileName}>{ profileName }</h1>
      <Cards list={cards} />
    </>
  );
}

export default Profile;

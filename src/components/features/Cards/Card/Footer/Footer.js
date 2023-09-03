import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from 'components/common/Checkbox/Checkbox';
import { ASYNC_STATUS } from 'constants/status';
import { CARD_TEXT } from 'constants/text';
import { updateFavoriteAsyncThunk, selectFavoriteProcessing } from 'store/slices/auth/subslices/updateFavorite';
import { makeReselectAuthorNameById } from 'store/slices/users';
import styles from './Footer.module.scss';

function Footer(props) {
  const { cardId, authorId, isFavorite } = props;
  const dispatch = useDispatch();
  const favoritesProcessing = useSelector(selectFavoriteProcessing);

  const reselectAuthorNameById = useMemo(makeReselectAuthorNameById, []);
  const author = useSelector(state => reselectAuthorNameById(state, authorId));

  function toggleFavoriteState() {
    dispatch(updateFavoriteAsyncThunk({ cardId, shouldAdd: !isFavorite }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.author}>{ CARD_TEXT.author }: { author || CARD_TEXT.unknownAuthor }</div>
      <Checkbox
        value={isFavorite}
        label={CARD_TEXT.favorites}
        handleChange={toggleFavoriteState}
        isUnderProcessing={favoritesProcessing[cardId] === ASYNC_STATUS.loading}
      />
    </div>
  );
}

export default Footer;

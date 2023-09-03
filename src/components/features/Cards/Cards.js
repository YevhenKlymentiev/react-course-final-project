import { useDispatch, useSelector } from 'react-redux';

import Error from 'components/common/Error/Error';
import Loader from 'components/common/Loader/Loader';
import Controls from './Controls/Controls';
import Card from './Card/Card';
import { CARD_LIST_TEXT } from 'constants/text';
import { FILTERING_ID } from 'constants/filteringOptions';
import { selectCurrentUserId } from 'store/slices/auth';
import { selectFavoriteIdsOfCurrentUser, selectFilteringId } from 'store/slices/cards';
import {
  getCardsAsyncThunk,
  selectGetCardsError,
  selectIsGetCardsLoading
} from 'store/slices/cards/subslices/getCards';
import styles from './Cards.module.scss';

function Cards(props) {
  const { list } = props;
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const isLoading = useSelector(selectIsGetCardsLoading);
  const error = useSelector(selectGetCardsError);
  const filteringId = useSelector(selectFilteringId);
  const favoriteIdsOfCurrentUser = useSelector(selectFavoriteIdsOfCurrentUser);

  function reloadCards() {
    dispatch(getCardsAsyncThunk());
  }

  function renderList() {
    return list.map(curr => (
      <Card
        key={curr.id}
        data={{...curr, isFavorite: favoriteIdsOfCurrentUser.includes(curr.id)}}
        isOwn={curr.authorId === currentUserId}
      />
    ));
  }

  function renderNoCardsResult() {
    if (filteringId === FILTERING_ID.favorites) {
      return (
        <>
          <Controls isSortingDisplayed={false} />
          <div className={styles.systemMessage}>{ CARD_LIST_TEXT.noFavorites}</div>
        </>
      );
    }

    return <div className={styles.systemMessage}>{ CARD_LIST_TEXT.noCards }</div>;
  }

  if (error) {
    return (
      <Error
        message={CARD_LIST_TEXT.getCardsError}
        actionBtnText={CARD_LIST_TEXT.reloadCards}
        handleAction={reloadCards}
      />
    );
  }

  if (isLoading) return <Loader />;
  if (!list.length) return renderNoCardsResult();

  return (
    <>
      <Controls />
      { renderList() }
    </>
  );
}

export default Cards;

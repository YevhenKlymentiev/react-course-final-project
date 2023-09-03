import { useDispatch, useSelector } from 'react-redux';

import Toggle from 'components/common/Toggle/Toggle';
import { cardsActions, selectFilteringId, selectSortingId } from 'store/slices/cards';
import { FILTERING_ID, FILTERING_LABEL } from 'constants/filteringOptions';
import { SORTING_ID, SORTING_LABEL } from 'constants/sortingOptions';
import styles from './Controls.module.scss';

const filteringOptions = [
  { id: FILTERING_ID.all, label: FILTERING_LABEL.all },
  { id: FILTERING_ID.favorites, label: FILTERING_LABEL.favorites }
];

const sortingOptions = [
  { id: SORTING_ID.dsc, label: SORTING_LABEL.dsc },
  { id: SORTING_ID.asc, label: SORTING_LABEL.asc }
];

function Controls(props) {
  const { isSortingDisplayed = true } = props;
  const dispatch = useDispatch();
  const filteringId = useSelector(selectFilteringId);
  const sortingId = useSelector(selectSortingId);

  function handleFilteringChange(id) {
    dispatch(cardsActions.setFilteringId(id));
  }

  function handleSortingChange(id) {
    dispatch(cardsActions.setSortingId(id));
  }

  return (
    <div className={styles.container}>
      <Toggle options={ filteringOptions } activeOptionId={ filteringId } onChange={ handleFilteringChange } />
      { isSortingDisplayed &&
        <Toggle options={ sortingOptions } activeOptionId={ sortingId } onChange={ handleSortingChange } />
      }
    </div>
  );
}

export default Controls;

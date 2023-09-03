import { SORTING_ID } from 'constants/sortingOptions';

function sortByDate({ list, direction, field }) {
  return list.sort((a, b) => (
    direction === SORTING_ID.dsc
      ? new Date(b[field]) - new Date(a[field])
      : new Date(a[field]) - new Date(b[field])
  ));
}

export default sortByDate;

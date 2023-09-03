import { useSelector } from 'react-redux';

import Cards from 'components/features/Cards/Cards';
import { reselectCards } from 'store/slices/cards';

function Feed() {
  const cards = useSelector(reselectCards);

  return <Cards list={cards} />;
}

export default Feed;

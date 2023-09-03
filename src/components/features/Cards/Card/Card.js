import { useState } from 'react';
import cx from 'classnames';

import EditMode from './EditMode/EditMode';
import ViewMode from './ViewMode/ViewMode';
import Footer from './Footer/Footer';
import { CARD_TEXT } from 'constants/text';
import { formatDateStr } from 'helpers/date';
import styles from './Card.module.scss';

function Card(props) {
  const { data, isOwn } = props;
  const { id, title, description, creationDate, authorId, isFavorite } = data;
  const [isEditModeActive, setIsEditModeActive] = useState(false);

  function toggleEditMode() {
    setIsEditModeActive(prevState => !prevState);
  }

  const dateElem = <div className={styles.date}>{ formatDateStr(creationDate) }</div>;

  return (
    <div className={cx(styles.container, {[styles.containerOwn]: isOwn})}>
      { isEditModeActive
        ? <EditMode cardId={id} initFieldValues={{ title, description }} close={toggleEditMode} dateElem={dateElem} />
        : <ViewMode title={title} description={description} dateElem={dateElem} />
      }
      <Footer
        cardId={id}
        authorId={authorId}
        isFavorite={isFavorite}
      />
      { (isOwn && !isEditModeActive) &&
        <button className={styles.editBtn} onClick={toggleEditMode}>
          { CARD_TEXT.edit }
        </button>
      }
    </div>
  );
}

export default Card;

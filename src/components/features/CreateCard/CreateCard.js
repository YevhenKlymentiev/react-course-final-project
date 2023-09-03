import { useState } from 'react';

import Button from 'components/common/Button/Button';
import Popup from 'components/common/Popup/Popup';
import { CARD_TEXT } from 'constants/text';
import Form from './Form/Form';
import styles from './CreateCard.module.scss';

function CreateCard() {
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);

  function togglePopupVisibility() {
    setIsPopupDisplayed(prevState => !prevState);
  }

  return (
    <>
      <Button type="button" extendingStyles={styles.btn} handleClick={togglePopupVisibility}>
        { CARD_TEXT.createCard }
      </Button>
      { isPopupDisplayed &&
        <Popup close={togglePopupVisibility}>
          <Form handleResult={togglePopupVisibility} />
        </Popup>
      }
    </>
  );
}

export default CreateCard;

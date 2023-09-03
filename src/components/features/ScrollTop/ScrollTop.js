import { useEffect, useRef, useState } from 'react';

import { UI_TEXT } from 'constants/text';
import styles from './ScrollTop.module.scss';

function ScrollTop() {
  const [ isBtnVisible, setIsBtnVisible ] = useState(false);
  const isBtnVisibleRef = useRef(isBtnVisible);
  isBtnVisibleRef.current = isBtnVisible;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop = document.documentElement.scrollTop;

    if (!isBtnVisibleRef.current &&  scrollTop > window.innerHeight) {
      setIsBtnVisible(true);
    }

    if (isBtnVisibleRef.current && scrollTop <= window.innerHeight) {
      setIsBtnVisible(false);
    }
  }

  const handleClick = (ev) => {
    ev.preventDefault();

    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isBtnVisible) return null;

  return <button className={styles.btn} onClick={handleClick}>{ UI_TEXT.scrollUp }</button>;
}

export default ScrollTop;

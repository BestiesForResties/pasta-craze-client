import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
return (
<div className={styles.container}>
<div className={styles.item}>
<div className={styles.card}>
  <h2 className={styles.motto}>
    WHERE PASTA MEETS ADDICTING
  </h2>
</div>
<div className={styles.card}>
  <p className={styles.text}>
    8374 PARK AVE
    <br />Bronx New York, 10458
    <br /> (718) 378-2929
  </p>
</div>
<div className={styles.card}>
  <p className={styles.text}>
    MONDAY - FRIDAY
    <br /> 12:00AM – 11:00PM
  </p>
  <p className={styles.text}>
    SATURDAY - SUNDAY
    <br /> 12:00PM - 1:00AM
  </p>
</div>
</div>
<div className={styles.contact}>
<h2>Contact</h2>
<p className={styles.text}>
  PastaCraze@info.com 
  <br />(718) 378-2929
</p>
</div>
</div>
);
};

export default Footer;
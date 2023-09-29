import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import backgroundImage from './background.webp';

const Home = () => {
return (
<div
className={styles['home-container']}
style={{ backgroundImage: `url(${backgroundImage})` }}
>
<div className={styles.header}>
  <div className={styles.topHeader}>
    <h1 className={styles.largeHeader}>
      Welcome to<span className={styles.craze}> Pasta Craze</span>
    </h1>
    <p className={styles.catchphrase}>
      Explore the flavors<span className={styles.highlight}> beyond pasta</span>
    </p>
    <Link to="/menu">
      <button className={styles.orderButton}>Order Now</button>
    </Link>
  </div>
</div>
</div>
);
};

export default Home;

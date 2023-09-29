import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ user, onLogout }) => {
return (
<nav className={styles.nav}>
<div className={styles.container}>
<ul className={styles.list}>
  <li className={styles.listItem}>
    <Link to="/" className={`${styles.navLink} ${styles.squareButton}`}>
      Home
    </Link>
  </li>
  <li className={styles.listItem}>
    <Link to="/menu" className={`${styles.navLink} ${styles.squareButton}`}>
      Menu
    </Link>
  </li>
</ul>
<div className={styles.logoContainer}>
  <img src="img/logo.png" alt="Pasta Craze Logo" className={styles.logo} />
</div>

{user ? (
  <div className={styles.userSection}>
    <span className={styles.userName}>{user.name}</span>
    <button className={styles.logOutButton} onClick={onLogout}>
      Log Out
    </button>
  </div>
) : null}

{!user ? (
  <Link to="/signin" className={`${styles.signInLink} ${styles.squareButton}`}>
    Sign Up
  </Link>
) : null}

<Link to="/cart" className={`${styles.cartButton} ${styles.squareButton}`}>
  <img src="/img/cart.png" alt="Shopping Cart" className={styles.cartIcon} />
</Link>
</div>
</nav>
);
};

export default Navbar;
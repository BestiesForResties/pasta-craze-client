import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import styles from './Navbar.module.css';
import Footer from './Footer';
import Home from './Home';
import Menu from './Menu.js';
import Cart from './cart.js';
import Signup from './Signup';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = () => {
   
    const loggedInUser = {
      name: 'mia',
    };

    setUser(loggedInUser);
  };

  return (
    <Router>
      <div>
        <Navbar user={user} onLogout={handleLogout} />
        <header className={styles.header}>
          <h1 className={styles.heading}></h1>
          <p className={styles.description}></p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/signin"
              element={<Signup onLogin={handleLogin} user={user} onLogout={handleLogout} />}
            />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
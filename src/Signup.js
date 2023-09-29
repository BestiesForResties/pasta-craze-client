import React, { useState } from 'react';
import styles from './Signup.module.css';

const SignUpLogin = ({ onLogin, user, onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    if (isLogin) {
      
      const user = { name: 'John Doe' };
      onLogin(user);
    } else {
     
      setIsSignUpSuccess(true);
      setIsLogin(true); 
    }
  };

  const handleLogout = () => {
 
    onLogout();
  };

return (
<div className={styles.formContainer}>
<header className={styles.headForm}>
  <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
  <p>{isLogin ? 'Login here using your username and password' : 'Sign up for an account'}</p>
</header>
<form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.fieldSet}>
    <span className={styles.inputItem}>
      <i className="fa fa-user-circle"></i>
    </span>
    <input
      className={styles.formInput}
      type="text"
      placeholder="@UserName"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <span className={styles.inputItem}>
      <i className="fa fa-key"></i>
    </span>
    <input
      className={styles.formInput}
      type="password"
      placeholder="Password"
      id="pwd"
      name="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <span>
      <i className="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>
    </span>
    <button className={styles.logIn} type="submit">
      {isLogin ? 'Log In' : 'Sign Up'}
    </button>
  </div>
  {isLogin && (
    <button className={styles.btn} onClick={handleToggle}>
      Forgot Password
    </button>
  )}
  {isLogin ? (
    <button className={styles.btn} onClick={handleToggle}>
      Sign Up
      <i className="fa fa-user-plus" aria-hidden="true"></i>
    </button>
  ) : null}
</form>
{isSignUpSuccess && (
  <p className={styles.successMessage}>You have been signed up successfully!</p>
)}
{user ? (
  <button className={styles.logOut} onClick={handleLogout}>
    Log Out
  </button>
) : null}
</div>
);
};

export default SignUpLogin;
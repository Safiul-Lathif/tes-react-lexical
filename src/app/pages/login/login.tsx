import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import styles from '../login/login.module.css'; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import { EmailOutline, Lock, LockAlert, LockOpenOutline, LockOutline } from 'mdi-material-ui';

const Login = () => {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Handle login logic here (e.g., send data to server)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        // Store user data (e.g., in local storage or using a library like NextAuth.js)
        // router.push('/dashboard'); // Redirect to dashboard
      } else {
        // Handle login errors (e.g., display error messages)
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Image
          src={appLogo}
          alt="Research Pick Logo"
          className={styles.logo}
        />
        <h1 className={styles.welcome}>Welcome back!</h1>
        <p>Enter your Credentials to access your account</p>
        <form className={styles.forms}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>
                <EmailOutline />
              </div>
              <input
                type="email"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>
                <LockOutline />
              </div>
              <input
                type="password"
                id="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.forgotPassword}>
            <Link href="/register" >
              Forget Password?
            </Link>
          </div>
          <button className={styles.login} type="submit">Login</button>
        </form>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>
        <div className={styles.socialLogin}>
          <button className={`${styles.socialLogin} ${styles.googleBtn}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image src={googleLogo} alt="Google Logo" width={20} height={20} />{' '}
              Sign in with Google
            </div>

          </button>
          <button className={`${styles.socialLogin} ${styles.appleBtn}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image src={appleLogo} alt="Apple Logo" width={20} height={20} />{' '}
              Sign in with Apple
            </div>
          </button>
        </div>
        <p>New to Research Pick?</p>
        <Link href="/register" className={styles.createAccount}>
          Create an account
        </Link>
      </div>
    </div>

  );
};

export default Login;
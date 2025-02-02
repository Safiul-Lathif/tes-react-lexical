import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import styles from '../forgetPassword/forgetPassword.module.css'; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import { EmailOutline, Lock, LockAlert, LockOpenOutline, LockOutline } from 'mdi-material-ui';
 
const ForgetPassword = () => {
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
      <h1 className={styles.welcome}>Forgot Password</h1>
      <p>Please Enter Your Email to reset the password</p>
      <form  className={styles.forms}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.wrapper}>
            <div className={styles.icon}>
              <EmailOutline/>
            </div>
          <input
            type="email"
            id="email"
            required
          />
          </div>
        </div>
        <button className={styles.login} type="submit">Reset Password</button>
      </form>
    </div>
  </div>

  );
};

export default ForgetPassword;
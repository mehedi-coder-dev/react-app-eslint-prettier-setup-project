/* eslint-disable jsx-a11y/label-has-associated-control */
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../style.scss';

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSumit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Messenger</span>
        <span className="title">Login</span>
        <form onSubmit={handleSumit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="submit">Sign in</button>
          {error && <span>There was somthing wrong</span>}
        </form>
        <p>
          You don&apos;t have an account?
          <Link to="/register">
            Register
          </Link>

        </p>
      </div>
    </div>
  );
}

export default Login;

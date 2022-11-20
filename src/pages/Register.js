/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import '../style.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import image from '../img/addAvatar.png';
import { auth, storage, db } from '../firebase';

function Register() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSumit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {

        },
        () => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'user', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChat', res.user.uid), {});

            navigate('/');
          });
        },
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Messenger</span>
        <span className="title">Register</span>

        <form onSubmit={handleSumit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <img src={image} alt="img" />
            <span>add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account?
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

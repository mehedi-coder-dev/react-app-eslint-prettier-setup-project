import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthUseContext } from '../context/AuthContext';

function Navbar() {
  const { currentUser } = AuthUseContext();

  return (
    <div className="navbar">
      <span className="logo">Messenger</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button type="button" onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;

/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where,
} from 'firebase/firestore';

import { db } from '../firebase';
import { AuthUseContext } from '../context/AuthContext';

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { currentUser } = AuthUseContext();

  const inputsearch = async () => {
    const citisRef = collection(db, 'user');
    const queryRef = query(citisRef, where('displayName', '==', username));

    try {
      const querySnapshort = await getDocs(queryRef);
      querySnapshort.forEach((docs) => {
        setUser(docs.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handlekeyDown = (e) => {
    if (e.code !== 'Enter') inputsearch();
  };

  const handleSelect = async () => {
    // eslint-disable-next-line max-len
    const combinetId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinetId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinetId), {
          messages: [],
        });
        //  update user chats
        await updateDoc(doc(db, 'userChat', currentUser.uid), {
          [combinetId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinetId + '.userDate']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChat', user.uid), {
          [combinetId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinetId + '.userDate']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername('');
  };

  return (
    <div className="search">
      <div className="searchFrom">
        <input type="text" placeholder="Find a user" onKeyUp={handlekeyDown} onChange={(e) => setUsername(e.target.value)} value={username} />
      </div>
      {error && <span>Data no found</span>}
      {user && (
      <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />

        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>
      )}
    </div>
  );
}

export default Search;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-spacing */
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AuthUseContext } from '../context/AuthContext';
import { ChatUseContext } from '../context/ChatAuthContext';
import { db } from '../firebase';

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = AuthUseContext();

  const {  dispatch } = ChatUseContext();

  useEffect(() => {
    const user = () => {
      const unsub = onSnapshot(doc(db, 'userChat', currentUser.uid), (docs) => {
        setChats(Object.entries(docs.data()));
      });

      return () => unsub();
    };
    // eslint-disable-next-line no-unused-expressions
    currentUser.uid && user();
  }, [currentUser.uid]);

  const handleClick = (u)=>{
    dispatch({
      type: 'USER_CLICK',
      playload: u,
    });
  };

  return (
    <div className="chats">
      {chats.sort((a, b)=> b[1].date - a[1].date).map((userInfo) => (
        <div className="userChat" key={userInfo[0]} onClick={()=> handleClick(userInfo[1].userInfo)}>
          <img src={userInfo[1].userInfo?.photoURL} alt="" />

          <div className="userChatInfo">
            <span>
              {userInfo[1].userInfo?.displayName}
              {' '}
            </span>
            <p>{userInfo[1].lastMessages?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;

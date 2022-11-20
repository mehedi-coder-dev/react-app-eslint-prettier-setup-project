/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { AuthUseContext } from '../context/AuthContext';

import { ChatUseContext } from '../context/ChatAuthContext';

// eslint-disable-next-line react/prop-types
function Message({ message }) {
  const { currentUser } = AuthUseContext();
  const { state } = ChatUseContext();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      ref={ref}
      // eslint-disable-next-line react/prop-types
      className={`message ${message.senderID === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            // eslint-disable-next-line react/prop-types
            message.senderID === currentUser.uid
              ? currentUser.photoURL
              : state.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">

        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

export default Message;

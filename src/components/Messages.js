import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ChatUseContext } from '../context/ChatAuthContext';
import { db } from '../firebase';
import Message from './Message';

function Messages() {
  const [messages, setMessages] = useState([]);
  const { state } = ChatUseContext();

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const unSub = state.chatId && onSnapshot(doc(db, 'chats', state.chatId), (doc) => {
      // eslint-disable-next-line no-unused-expressions
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      // eslint-disable-next-line no-unused-expressions
      state.chatId && unSub();
    };
  }, [state.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages;

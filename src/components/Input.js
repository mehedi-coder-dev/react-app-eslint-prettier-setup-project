/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  arrayUnion, doc, serverTimestamp, Timestamp, updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { ChatUseContext } from '../context/ChatAuthContext';
import { db, storage } from '../firebase';
import { AuthUseContext } from '../context/AuthContext';

function Input() {
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const { state } = ChatUseContext();
  const { currentUser } = AuthUseContext();

  const handleClick = async () => {
    if (Img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on('state_changed', () => {}, () => {}, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, 'chats', state.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderID: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChat', currentUser.uid), {

      [state.chatId + '.lastMessages']: {
        text,
      },
      [state.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChat', state.user.uid), {

      [state.chatId + '.lastMessages']: {
        text,
      },
      [state.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImg();
  };

  return (
    <div className="input">
      {state.chatId && (
      <>
        <input type="text" value={text} placeholder="Type something..." onChange={(e) => setText(e.target.value)} />
        <div className="send">

          <input type="file" style={{ display: 'none' }} id="file" onChange={(e) => setImg(e.target.files[0])} />
          <label htmlFor="file">
            <img src={Attach} alt="" />
          </label>
          <img src={Img} alt="" />
          <button type="button" onClick={handleClick}>Send</button>
        </div>
      </>
      )}
    </div>
  );
}

export default Input;

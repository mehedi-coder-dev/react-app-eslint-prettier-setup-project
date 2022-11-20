import React from 'react';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import '../style.scss';

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;

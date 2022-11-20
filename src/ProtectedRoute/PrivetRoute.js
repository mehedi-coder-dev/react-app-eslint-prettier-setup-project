/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthUseContext } from '../context/AuthContext';

function PrivetRoute({ children }) {
  const { currentUser } = AuthUseContext();

  return !currentUser ? children : <Navigate to="/" />;
}

export default PrivetRoute;

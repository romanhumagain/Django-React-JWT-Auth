import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const {user} = useContext(AuthContext)

  const isAuthenticated = user?true:false; 

  return isAuthenticated ? element : <Navigate to={'/'} />;
}; 

export default PrivateRoute;

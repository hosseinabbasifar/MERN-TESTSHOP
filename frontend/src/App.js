import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from './slices/authSlice';
import { useGetProfileQuery } from './slices/userApiSlice';
import Loading from './components/Loading';

// App.js is only responsible for rendering ToastContainer and Outlet.
// All Header, Footer and Container logic has been moved to their respective files.
const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProfileQuery();


  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    } else if (isError) {
      dispatch(logout());
    }
  }, [data, isError, dispatch]);

  if (isLoading) return <Loading />;


  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;

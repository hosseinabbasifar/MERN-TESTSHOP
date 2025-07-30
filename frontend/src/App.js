import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from './slices/authSlice';
import { useGetProfileQuery } from './slices/userApiSlice';
import Loading from './components/Loading';

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
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

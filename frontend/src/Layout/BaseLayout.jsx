import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import { LoadingOverlay } from '@mantine/core';
import CustomLoader from '../Components/CustomLoader';
import FullScreenLoader from '../Components/FullScreenLoader';

const BaseLayout = () => {
  const { user } = useSelector((state) => state.user);
  const { loadingOverlay } = useSelector((state) => state.utils);

  if (user)
    return (
      <>
        <LoadingOverlay
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 9999
          }}
          opacity={0.6}
          color="#000"
          loader={<CustomLoader />}
          blur={2}
          visible={loadingOverlay}
        />
        <Navbar />
        <Outlet />
      </>
    );
  else return <FullScreenLoader />;
};

export default BaseLayout;

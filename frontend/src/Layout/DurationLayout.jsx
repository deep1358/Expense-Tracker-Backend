import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Components/Breadcrumb/Breadcrumb';
import { Outlet, useLocation } from 'react-router-dom';

const DurationLayout = () => {
  const [crumbItems, setCrumbItems] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const paths = location.pathname.split('/').slice(1);
    const tempCrumbItems = [];
    paths.forEach((path, index) => {
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      const to = `${paths.slice(0, index + 1).join('/')}`;
      tempCrumbItems.push({ label, to });
    });
    setCrumbItems(tempCrumbItems);
  }, [location]);

  return (
    <>
      <Breadcrumb crumbItems={crumbItems} />
      <Outlet />
    </>
  );
};

export default DurationLayout;

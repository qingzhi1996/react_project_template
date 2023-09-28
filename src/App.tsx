import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/router/route.tsx';
import '@/styles/index.less';

const RouterConfig = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/" />} />
        {ROUTES.map((route, i) => {
          return <Route key={route.path || i} path={route.path} element={route.component} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;

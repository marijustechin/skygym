import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { MainLayout } from '@/widgets/MainLayout';
import { AdminLayout } from '@/widgets/AdminLayout';

// Pages
const LazyHomePage = React.lazy(() => import('@/pages/HomePage'));
const LazyContactPage = React.lazy(() => import('@/pages/ContactPage'));
const LazyLoginPage = React.lazy(() => import('@/pages/LoginPage'));

// Admin pages
const LazyAdminHomePage = React.lazy(() => import('@/pages/AdminHomePage'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<LazyHomePage />} />
          <Route path='/kontaktai' element={<LazyContactPage />} />
          <Route path='/prisijungti' element={<LazyLoginPage />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<LazyAdminHomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

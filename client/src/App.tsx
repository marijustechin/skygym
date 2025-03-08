import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { useTranslation } from 'react-i18next';
// layouts & pages
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { PricesPage } from './pages/PricesPage';
import { TOCPage } from './pages/TOCPage';
import { ContactPage } from './pages/ContactPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
// admin
import { AdminLayout } from './layouts/AdminLayout';
import { AdminHome } from './pages/admin/AdminHome';
// user
import { UserLayout } from './layouts/UserLayout';
import { UserHome } from './pages/user/UserHome';

function App() {
  const { i18n } = useTranslation();
  // atstatom kalbą
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="prisijungimas" element={<LoginPage />} />
          <Route path="registracija" element={<RegistrationPage />} />
          <Route path="taisykles" element={<TOCPage />} />
          <Route path="kainos" element={<PricesPage />} />
          <Route path="kontaktai" element={<ContactPage />} />
        </Route>
        <Route path="/mano-paskyra" element={<UserLayout />}>
          <Route index element={<UserHome />} />
        </Route>
        <Route path="/suvestine" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

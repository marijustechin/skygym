import { BrowserRouter, Route, Routes } from 'react-router';
// layouts
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserLayout } from './layouts/UserLayout';
// pages
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { TOCPage } from './pages/TOCPage';
import { PricesPage } from './pages/PricesPage';
import { UserHome } from './pages/user/UserHome';
import { AdminHome } from './pages/admin/AdminHome';

function App() {
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

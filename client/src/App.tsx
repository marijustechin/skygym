import { BrowserRouter, Route, Routes } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { TOCPage } from './pages/TOCPage';
import { PricesPage } from './pages/PricesPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

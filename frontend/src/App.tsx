import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './pages/Inscription';
import ConfirmationEmail from './pages/ConfirmationEmail';
import Validation from './pages/Validation'; // Crée cette page ensuite
import ValidationConfirmee from './pages/ValidationConfirmee';
import './App.css';
import HomePage from './pages/HomePage'; // Import the HomePage component
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import ResendEmail from './pages/ResendEmail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accueil" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/resend-confirmation-mail" element={<ResendEmail />} />

        <Route path="/confirmation-email/:token" element={<ConfirmationEmail />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/validation-confirme" element={<ValidationConfirmee />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

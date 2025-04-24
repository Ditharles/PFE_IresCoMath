import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './pages/Inscription';
import ConfirmationEmail from './pages/ConfirmationEmail';
import Validation from './pages/Validation'; // Crée cette page ensuite
import ValidationConfirmee from './pages/ValidationConfirmee'; 
import './App.css';
import HomePage from './pages/HomePage'; // Import the HomePage component
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import EspaceDirecteur from './pages/EspaceDirecteur';
import { configDotenv } from 'dotenv';
configDotenv();
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accueil" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/confirmation-email" element={<ConfirmationEmail />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/validation-confirme" element={<ValidationConfirmee />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/espace-directeur" element={<EspaceDirecteur />} />
      </Routes>
    </BrowserRouter>
  );
}

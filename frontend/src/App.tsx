import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inscription from './pages/Inscription';
import Validation from './pages/Validation'; // Crée cette page ensuite
import './App.css';
import HomePage from './pages/HomePage'; // Import the HomePage component
import LoginPage from './pages/LoginPage'; // Import the LoginPage component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accueil" element={<HomePage />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

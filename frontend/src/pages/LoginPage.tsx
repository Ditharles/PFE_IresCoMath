import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic
    console.log("Logging in with:", emailOrId, password);
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
    <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-700">Connexion</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email ou ID</label>
            <input
              type="text"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Se connecter
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Pas encore de compte?{" "}
            <Link to="/inscription" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    
  );
}
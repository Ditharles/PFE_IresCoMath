import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ValidationConfirmee() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // redirige après 3s
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Compte confirmé !</h2>
      <p className="text-gray-700">Redirection vers la connexion en cours...</p>
    </div>
  );
}




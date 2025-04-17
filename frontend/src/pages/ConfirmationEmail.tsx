// pages/ConfirmationEmail.tsx  
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function ConfirmationEmail() {
const {token} = useParams<{ token: string }>();
    useEffect(() => {
        
        const endpoint = process.env.BACKEND_API + "/auth/confirm-request/"+ token;
        try {
            axios.get(endpoint, {
                headers: { 
                            'Content-Type': 'application/json',
        }})}
         catch (error) {
            console.error("Error confirming email:", error);
        }
    }, [token]);

    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Confirmation par Email</h2>
        <p className="text-gray-700">
          Un email de confirmation vous a été envoyé. Cliquez sur le lien dans cet email pour continuer la validation de votre compte.
        </p>
        <p>Cliquez pour recevoir un nouveau mail de confirmation</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Renvoi de l'email
        </button>
      </div>
    );

  }
  
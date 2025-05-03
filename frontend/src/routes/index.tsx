import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import PublicRoute from "../components/routes/PublicRoute";
import Login from "../pages/auth/Login";
import Inscription from "../pages/auth/Inscription";
import ResendEmail from "../pages/auth/ResendEmail";
import ConfirmationEmail from "../pages/auth/ConfirmationEmail";
import ValidationConfirmee from "../pages/auth/ValidationConfirme";
import PrivateRoute from "../components/routes/PrivateRoute";
import AdditionalInfo from "../pages/auth/AdditionalInfo";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import NouvelleDemande from "../pages/NouvelleDemande";
import PasswordForget from "../pages/password-forget";
import PasswordReset from "../pages/password-reset";

const routes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    },
    //Routes non accessibles une fois connecté
    {
        element: <PublicRoute />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "inscription",
                element: <Inscription />,
            },
            {
                path: "resend-confirmation-email",
                element: <ResendEmail />,
            },
            {
                path: "confirm-email/:token",
                element: <ConfirmationEmail />
            },
            {
                path: "validation-confirme/:token",
                element: <ValidationConfirmee />
            },
            {
                path: "password-forget",
                element: <PasswordForget />
            },
            {
                path: "password-reset/:token",
                element: <PasswordReset />
            },
        ],
    },
    //Routes necessitant une connexion
    {
        element: <PrivateRoute />,
        children: [
            {
                element: <Layout />, // Layout ajouté ici
                children: [
                    {
                        path: "accueil",
                        element: <HomePage />
                    },
                    {
                        path: "demande/:type",
                        element: <NouvelleDemande />   
                    },
                    {
                        path: "additional-info",
                        element: <AdditionalInfo />
                    },
                ]
            }
        ]
    },

    //Routes lié au roles 
    // (Laissez cette section vide si pas encore implémenté)

    //404
    {
        path: "*",
        element: <NotFound />
    }
]

export default routes;
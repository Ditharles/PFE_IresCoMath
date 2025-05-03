import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import PublicRoute from "../components/routes/PublicRoute";
import Login from "../pages/auth/Login";
import Inscription from "../pages/auth/Inscription";
import ResendEmail from "../pages/auth/ResendEmail";
import ConfirmationEmail from "../pages/auth/ConfirmationEmail";
import ValidationConfirme from "../pages/auth/ValidationConfirme";
import PrivateRoute from "../components/routes/PrivateRoute";
import AdditionalInfo from "../pages/auth/AdditionalInfo";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
<<<<<<< HEAD
import NouvelleDemande from "../pages/NouvelleDemande";
=======
import GestionMembres from "../pages/directeur/GestionMembres";
import RoleBasedRoute from "../components/routes/RoleBasedRoute";
import Layout from "../components/dashboard/directeur/Layout";

>>>>>>> origin/main
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
                element: <ValidationConfirme />
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
<<<<<<< HEAD
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
=======
                path: "accueil",
                element: <HomePage />
            },
            {
                path: "informations-supplementaires",
                element: <AdditionalInfo />
            },

>>>>>>> origin/main
        ]
    },

    //Routes lié au roles 
<<<<<<< HEAD
    // (Laissez cette section vide si pas encore implémenté)
=======
    {
        element: <RoleBasedRoute allowedRoles={["DIRECTEUR"]} />,
        children: [
            {
                path: "membres",
                element: <Layout><GestionMembres /> </Layout>
            }
        ]
    },

>>>>>>> origin/main

    //404
    {
        path: "*",
        element: <NotFound />
    }
]

export default routes;
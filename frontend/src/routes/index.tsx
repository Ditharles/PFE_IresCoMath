import { RouteObject } from "react-router-dom";
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
import GestionMembres from "../pages/directeur/GestionMembres";
import RoleBasedRoute from "../components/routes/RoleBasedRoute";

import PasswordForget from "../pages/password-forget";
import PasswordReset from "../pages/password-reset";
import MemberAddRequest from "../pages/MemberAddRequest";
const routes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    },
    //Routes non inaccessibles une fois connecté
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
                path: "accueil",
                element: <HomePage />
            },
            {
                path: "informations-supplementaires",
                element: <AdditionalInfo />
            },

        ]
    },

    //Routes lié au roles 
    {
        element: <RoleBasedRoute allowedRoles={["DIRECTEUR"]} />,
        children: [
            {
                path: "membres",
                element: <GestionMembres />
            },
            {
                path: "membre",
                element: <MemberAddRequest />
            }
        ]
    },


    //404
    {
        path: "*",
        element: <NotFound />
    }
]

export default routes
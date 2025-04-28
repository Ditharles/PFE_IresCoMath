import { RouteObject } from "react-router-dom";
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
import GestionMembres from "../pages/directeur/GestionMembres";

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
                element: <ValidationConfirmee />
            }
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
                path: "additional-info",
                element: <AdditionalInfo />
            },
            {
                path: "gestion-des-membres",
                element: <GestionMembres />
            }
        ]
    },

    //Routes lié au roles 


    //404
    {
        path: "*",
        element: <NotFound />
    }
]

export default routes
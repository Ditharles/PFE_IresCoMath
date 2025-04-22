import { RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PublicRoute from "../components/routes/PublicRoute";
import Login from "../pages/Login";
import Inscription from "../pages/Inscription";
import ResendEmail from "../pages/ResendEmail";
import ConfirmationEmail from "../pages/ConfirmationEmail";
import ValidationConfirmee from "../pages/ValidationConfirme";
import PrivateRoute from "../components/routes/PrivateRoute";
import AdditionalInfo from "../pages/AdditionalInfo";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

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
                path: "resend-confirmation-mail/:token",
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
                path: "acceuil",
                element: <HomePage />
            },
            {
                path: "additional-info",
                element: <AdditionalInfo />
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
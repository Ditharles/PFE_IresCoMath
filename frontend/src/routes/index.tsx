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

import PasswordForget from "../pages/auth/password-forget";
import PasswordReset from "../pages/auth/password-reset";
import MemberAddRequest from "../pages/MemberAddRequest";

import CategoriesPage from "../pages/equipment/Categories";
import EquipmentsPage from "../pages/equipment/Equipments";
import CategoryPage from "../pages/equipment/Category";
import NewRequest from "../pages/requests/NewRequest";
import NewRequests from "../pages/requests/NewRequests";
import RequestDetails from "../pages/requests/RequestsDetails";
import Historique from "../pages/Historique";
import AddCategory from "../pages/equipment/AddCategory";
import AddEquipment from "../pages/equipment/AddEquipment";
import EquipmentPage from "../pages/equipment/Equipment";
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
                path: "informations-supplementaires",
                element: <AdditionalInfo />
            },
            {
                path: "nouvelle-demande",
                element: <NewRequests />
            },
            {
                path: "nouvelle-demande/:type",
                element: <NewRequest />
            },

            {
                path: "demande/:id",
                element: <RequestDetails />
            }

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
            },
            {
                path: "demandes",
                element: <Historique />
            },
            {
                path: "demandes/:status",
                element: <Historique />
            }
            ,
            {
                path: "materiels",
                element: <EquipmentsPage />
            },
            {
                path: "materiels/:status",
                element: <EquipmentsPage />
            },
            {
                path: "materiel/:id",
                element: <EquipmentPage />
            },
            {
                path: "materiels/inventaire",
                element: <CategoriesPage />
            },
            {
                path: "materiels/categories/:id",
                element: <CategoryPage />
            },
            {
                path: "materiels/categories/ajouter",
                element: <AddCategory />
            },
            {
                path: "materiels/nouveau-materiel",
                element: <AddEquipment />
            }
        ]
    },
    {
        element: <RoleBasedRoute allowedRoles={["DOCTORANT", "MASTER", "ENSEIGNANT"]} />,
        children: [
            {
                path: "historique",
                element: <Historique />
            }
        ]
    },
    {
        element: <RoleBasedRoute allowedRoles={["DOCTORANT", "MASTER", "ENSEIGNANT"]} />,
        children: [
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

import { Navigate, RouteObject } from "react-router-dom";
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
import Profile from "../pages/Profile";
import MemberDetails from "../pages/directeur/MemberDetails";

import Calendar from "../pages/Calendar";
import AddCategory from "../pages/equipment/AddCategory";
import AddEquipment from "../pages/equipment/AddEquipment";
import EquipmentPage from "../pages/equipment/Equipment";

import { TemplateList } from "../pages/templates/List";
import AddTemplate from "../pages/templates/Add";
import EditTemplate from "../pages/templates/Edit";
import MembersStats from "../pages/statistiques/MembersStats";
import EquipmentStats from "../pages/statistiques/EquipmentStats";
import RequestsStats from "../pages/statistiques/RequestsStats";

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
            },
  { path: "profil", element: <Profile /> },


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
            },
            {
                path: "templates",
                element: <TemplateList />
            },
            {
                path: "templates/ajouter",
                element: <AddTemplate />
            },
            {
                path: "templates/modifier/:id",
                element: <EditTemplate />
            }, {
                path: "statistiques/",
                element: <Navigate to={"/statistiques/membres"} />
            },
            {
                path: "statistiques/membres",
                element: <MembersStats />
            },
            {
                path: "statistiques/materiels",
                element: <EquipmentStats />
            },
            {
                path: "statistiques/demandes",
                element: <RequestsStats />
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
     {
    element: <RoleBasedRoute allowedRoles={["DIRECTEUR", "ENSEIGNANT", "DOCTORANT", "MASTER"]} />,
    children: [
      {
        path: "membre/:id/:role",
        element: <MemberDetails />,
      }
    ]
  },

    // {
    //     path: "test",
    //     element: <Calendar />
    // },
    //404
    {
        path: "*",
        element: <NotFound />
    }
]

export default routes
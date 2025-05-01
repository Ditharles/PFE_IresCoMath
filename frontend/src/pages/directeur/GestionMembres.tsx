import { useState } from "react";
import Membres from "../../components/dashboard/directeur/Members";

const GestionMembres = () => {

    const [darkMode, setDarkMode] = useState<boolean>(false);

    return (
        <div
            className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
        >

            <Membres />

        </div>
    );
};

export default GestionMembres;
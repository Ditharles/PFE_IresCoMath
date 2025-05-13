
import Requests from '../components/dashboard/requests/Requests'

const Historique = () => {
    const darkMode = false
    return (
        <div
            className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
        >

            <Requests />

        </div>
    )
}

export default Historique
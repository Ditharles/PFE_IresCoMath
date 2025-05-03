"use client"

import { useState } from "react"
import { MoonIcon, SunIcon, BellIcon } from "@heroicons/react/24/outline"
import UserProfile from "../components/UserProfile"
import NotificationsPanel from "../components/NotificationsPanel"
import { getUser } from "../utils/tokens.utils"
import { Link } from "react-router-dom";

type Request = {
  id: string
  date: string
  type: string
  info: string
  status: string
}

const HomePage = () => {
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false)
  const [showNotifications, setShowNotifications] = useState<boolean>(false)

  //TODO: données réeels 
  const unreadNotificationsCount = 2

  const user = getUser()


  const requests: Request[] = [
    { id: "1", date: "2023-05-15", type: "Vacation", info: "Summer vacation", status: "Approved" },
    { id: "2", date: "2023-06-20", type: "Sick Leave", info: "Flu symptoms", status: "Pending" },
    { id: "3", date: "2023-07-10", type: "Remote Work", info: "Home office setup", status: "Rejected" },
    { id: "4", date: "2023-08-05", type: "Vacation", info: "Family trip", status: "Approved" },
    { id: "5", date: "2023-09-12", type: "Sick Leave", info: "Doctor appointment", status: "Pending" },
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleUserProfile = () => {
    if (showNotifications) setShowNotifications(false)
    setShowUserProfile(!showUserProfile)
  }

  const toggleNotifications = () => {
    if (showUserProfile) setShowUserProfile(false)
    setShowNotifications(!showNotifications)
  }

  const filteredRequests = requests.filter((request) => {
    // Filter by date range
    if (startDate && request.date < startDate) return false
    if (endDate && request.date > endDate) return false

    // Filter by type
    if (filterType && request.type !== filterType) return false

    // Filter by status
    if (filterStatus && request.status !== filterStatus) return false

    // Filter by search query (checks info, type, status, and date)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      return (
        request.info.toLowerCase().includes(searchLower) ||
        request.type.toLowerCase().includes(searchLower) ||
        request.status.toLowerCase().includes(searchLower) ||
        request.date.includes(searchQuery)
      )
    }

    return true
  })

  const clearFilters = () => {
    setStartDate("")
    setEndDate("")
    setFilterType("")
    setFilterStatus("")
    setSearchQuery("")
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
    >
      {/* Header */}
      <header
        className={`shadow-sm py-4 px-6 flex justify-between items-center ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h1 className="text-2xl font-bold">LOGO</h1>
        <div className="flex items-center space-x-4">
          <div className={`relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 rounded-md ${darkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"} border`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Bouton de notifications */}
          <button
            onClick={toggleNotifications}
            className={`relative p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="Notifications"
          >
            <BellIcon className="h-6 w-6" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "text-yellow-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>

          {/* Bouton de profil utilisateur */}
          <button
            onClick={toggleUserProfile}
            className={`relative overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="User profile"
          >
            {user.profileImage ? (
              <img
                src={user.profileImage || "/placeholder.svg"}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover border-2 border-transparent hover:border-blue-500 transition-all"
              />
            ) : (
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                  }`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}

            {/* Indicateur de notification (optionnel) */}
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`md:col-span-1 p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <nav>
              <ul className="space-y-4">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md font-medium ${darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-700"}`}
                  >
                    Historique
                  </button>
                </li>
                <li>
                <Link
    to="/nouvelleDemande" // Ajout du lien vers la page NouvelleDemande
    className={`w-full text-left px-4 py-2 rounded-md font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
  >
    Nouvelle Demande
  </Link>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    Soumettre justificatifs
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    Profil
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md font-medium ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    Paramètres
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 space-y-6">
            {/* Filter Section */}
            <div className={`p-4 rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter</h2>
                <button
                  onClick={clearFilters}
                  className={`text-sm ${darkMode ? "text-blue-300 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"}`}
                >
                  Clear all filters
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Date début
                  </label>
                  <input
                    type="date"
                    className={`w-full p-2 border rounded-md ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Date fin
                  </label>
                  <input
                    type="date"
                    className={`w-full p-2 border rounded-md ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Type
                  </label>
                  <select
                    className={`w-full p-2 border rounded-md ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Remote Work">Remote Work</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Status
                  </label>
                  <select
                    className={`w-full p-2 border rounded-md ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Requests Table */}
            <div className={`p-4 rounded-lg shadow overflow-x-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Requests ({filteredRequests.length})</h2>
              </div>
              {filteredRequests.length === 0 ? (
                <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  No requests found matching your filters
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        Date
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        Type
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        Infos
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                    {filteredRequests.map((request) => (
                      <tr
                        key={request.id}
                        className={darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"}
                      >
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {request.date}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {request.type}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                        >
                          {request.info}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === "Approved"
                              ? darkMode
                                ? "bg-green-900 text-green-100"
                                : "bg-green-100 text-green-800"
                              : request.status === "Pending"
                                ? darkMode
                                  ? "bg-yellow-900 text-yellow-100"
                                  : "bg-yellow-100 text-yellow-800"
                                : darkMode
                                  ? "bg-red-900 text-red-100"
                                  : "bg-red-100 text-red-800"
                              }`}
                          >
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Panneau latéral de profil utilisateur */}
      {showUserProfile && <UserProfile darkMode={darkMode} onClose={() => setShowUserProfile(false)} user={user} />}

      {/* Panneau latéral de notifications */}
      {showNotifications && <NotificationsPanel darkMode={darkMode} onClose={() => setShowNotifications(false)} />}
    </div>
  )
}

export default HomePage

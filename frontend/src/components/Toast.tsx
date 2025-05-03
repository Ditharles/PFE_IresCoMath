"use client"

import { ToastContainer, toast as toastify } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

const toastStyles = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    className: "bg-green-50 text-green-800 border-l-4 border-green-500"
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    className: "bg-red-50 text-red-800 border-l-4 border-red-500"
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    className: "bg-blue-50 text-blue-800 border-l-4 border-blue-500"
  },
  warning: {
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    className: "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500"
  },
}

export function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={false}
      pauseOnHover={true}
      theme="light"
      toastClassName="relative flex p-4 min-h-16 rounded-md justify-between overflow-hidden cursor-pointer shadow-lg my-2 mx-4"
      bodyClassName="flex items-center text-sm font-medium gap-3"
      closeButton={({ type }) => (
        <button className={`
          absolute top-2 right-2 p-1 rounded-full hover:bg-opacity-20 transition-colors
          ${type === "success" ? "hover:bg-green-500" : ""}
          ${type === "error" ? "hover:bg-red-500" : ""}
          ${type === "info" ? "hover:bg-blue-500" : ""}
          ${type === "warning" ? "hover:bg-yellow-500" : ""}
        `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    />
  )
}

export const toast = {
  success: (message: string, options?: any) => {
    toastify.success(message, {
      icon: toastStyles.success.icon,
      className: toastStyles.success.className,
      autoClose: 3000,
      ...options,
    })
  },
  error: (message: string, options?: any) => {
    toastify.error(message, {
      icon: toastStyles.error.icon,
      className: toastStyles.error.className,
      autoClose: 3000,
      ...options,
    })
  },
  info: (message: string, options?: any) => {
    toastify.info(message, {
      icon: toastStyles.info.icon,
      className: toastStyles.info.className,
      autoClose: 3000,
      ...options,
    })
  },
  warning: (message: string, options?: any) => {
    toastify.warning(message, {
      icon: toastStyles.warning.icon,
      className: toastStyles.warning.className,
      autoClose: 3000,
      ...options,
    })
  },
}
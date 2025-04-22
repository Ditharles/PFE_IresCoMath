"use client"

import { ToastContainer, toast as toastify } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"

// Custom toast styles to match application theme
const toastStyles = {
  success: {
    style: {
      background: "#EFF6FF",
      color: "#1E40AF",
      borderLeft: "4px solid #3B82F6",
    },
    icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
  },
  error: {
    style: {
      background: "#FEF2F2",
      color: "#B91C1C",
      borderLeft: "4px solid #EF4444",
    },
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
  info: {
    style: {
      background: "#F0F9FF",
      color: "#0369A1",
      borderLeft: "4px solid #0EA5E9",
    },
    icon: <Info className="w-5 h-5 text-sky-500" />,
  },
  warning: {
    style: {
      background: "#FFFBEB",
      color: "#92400E",
      borderLeft: "4px solid #F59E0B",
    },
    icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
  },
}

// Toast container component
export function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  )
}

// Toast functions
export const toast = {
  success: (message: string) => {
    toastify.success(message, {
      icon: toastStyles.success.icon,
      style: toastStyles.success.style,
    })
  },
  error: (message: string) => {
    toastify.error(message, {
      icon: toastStyles.error.icon,
      style: toastStyles.error.style,
    })
  },
  info: (message: string) => {
    toastify.info(message, {
      icon: toastStyles.info.icon,
      style: toastStyles.info.style,
    })
  },
  warning: (message: string) => {
    toastify.warning(message, {
      icon: toastStyles.warning.icon,
      style: toastStyles.warning.style,
    })
  },
}

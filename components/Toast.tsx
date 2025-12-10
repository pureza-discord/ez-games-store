'use client'

import { useEffect } from 'react'
import { FiCheckCircle, FiX } from 'react-icons/fi'

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed top-24 right-4 z-[9999] animate-slide-in">
      <div className="glass-effect-pink rounded-xl p-4 shadow-2xl flex items-center space-x-3 min-w-[320px] border-2 border-green-400/50">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <FiCheckCircle size={24} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">{message}</p>
          <p className="text-xs text-gray-300 mt-1">Item adicionado com sucesso!</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  )
}


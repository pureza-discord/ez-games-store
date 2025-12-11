'use client'

import { FiCheckCircle, FiX, FiAlertCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { ToastType } from '@/store/toastStore'

interface ToastProps {
  message: string
  type?: ToastType
  onClose: () => void
}

const toastConfig = {
  success: {
    bgColor: 'bg-green-500',
    borderColor: 'border-green-400/50',
    icon: FiCheckCircle,
    subtitle: 'Sucesso!'
  },
  error: {
    bgColor: 'bg-red-500',
    borderColor: 'border-red-400/50',
    icon: FiXCircle,
    subtitle: 'Erro'
  },
  warning: {
    bgColor: 'bg-yellow-500',
    borderColor: 'border-yellow-400/50',
    icon: FiAlertCircle,
    subtitle: 'Atenção'
  },
  info: {
    bgColor: 'bg-blue-500',
    borderColor: 'border-blue-400/50',
    icon: FiInfo,
    subtitle: 'Informação'
  }
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  const config = toastConfig[type]
  const Icon = config.icon

  return (
    <div className="animate-slide-in w-full">
      <div className={`glass-effect-pink rounded-xl p-4 shadow-2xl flex items-center space-x-3 min-w-[320px] border-2 ${config.borderColor}`}>
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white">{message}</p>
          <p className="text-xs text-gray-300 mt-1">{config.subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <FiX size={20} className="text-white" />
        </button>
      </div>
    </div>
  )
}


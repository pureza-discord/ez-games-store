'use client'

import { useConfirmStore } from '@/store/confirmStore'
import { FiAlertCircle, FiX } from 'react-icons/fi'

export default function ConfirmDialog() {
  const { isOpen, title, message, onConfirm, onCancel, hideConfirm } = useConfirmStore()

  if (!isOpen) return null

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    hideConfirm()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    hideConfirm()
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-secondary border-2 border-primary/30 rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in shadow-2xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <FiAlertCircle size={24} className="text-yellow-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={handleCancel}
            className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FiX size={20} className="text-text-secondary" />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-bg-tertiary hover:bg-bg-tertiary/80 text-text font-semibold rounded-lg transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all"
          >
            Adicionar Mesmo Assim
          </button>
        </div>
      </div>
    </div>
  )
}


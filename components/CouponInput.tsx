'use client'

import { useState } from 'react'
import { useCouponStore } from '@/store/couponStore'
import { useToastStore } from '@/store/toastStore'
import { FiTag, FiX, FiCheck } from 'react-icons/fi'

interface CouponInputProps {
  cartTotal: number
}

export default function CouponInput({ cartTotal }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const { appliedCoupon, applyCoupon, removeCoupon } = useCouponStore()
  const addToast = useToastStore((state) => state.addToast)

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      addToast('Digite um código de cupom', 'warning')
      return
    }

    setIsApplying(true)
    const result = applyCoupon(couponCode.trim(), cartTotal)

    if (result.success) {
      addToast(result.message, 'success')
      setCouponCode('')
    } else {
      addToast(result.message, 'error')
    }

    setIsApplying(false)
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    addToast('Cupom removido', 'info')
  }

  if (appliedCoupon) {
    return (
      <div className="bg-accent/10 border-2 border-accent rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <FiCheck size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-text">Cupom Aplicado</p>
            <p className="text-sm text-text-secondary">{appliedCoupon.code}</p>
          </div>
        </div>
        <button
          onClick={handleRemoveCoupon}
          className="p-2 hover:bg-danger/20 rounded-lg transition-colors text-danger"
        >
          <FiX size={20} />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text">
        Cupom de Desconto
      </label>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
            placeholder="Digite o código"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
          />
        </div>
        <button
          onClick={handleApplyCoupon}
          disabled={isApplying || !couponCode.trim()}
          className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isApplying ? 'Aplicando...' : 'Aplicar'}
        </button>
      </div>
      
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
        <p className="text-xs text-text-secondary">
          <strong className="text-primary">Cupons disponíveis:</strong> PRIMEIRACOMPRA, BLACKFRIDAY, DESCONTO10, VIP20, BEMVINDO
        </p>
      </div>
    </div>
  )
}


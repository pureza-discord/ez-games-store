import { create } from 'zustand'

export interface Coupon {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minPurchase?: number
  maxDiscount?: number
  active: boolean
}

interface CouponState {
  appliedCoupon: Coupon | null
  applyCoupon: (code: string, cartTotal: number) => { success: boolean; message: string; coupon?: Coupon }
  removeCoupon: () => void
  getDiscount: (cartTotal: number) => { percentage: number; amount: number }
}

// Cupons pré-cadastrados (em produção, viriam do banco de dados)
const availableCoupons: Coupon[] = [
  {
    code: 'PRIMEIRACOMPRA',
    type: 'percentage',
    value: 15,
    minPurchase: 30,
    active: true
  },
  {
    code: 'BLACKFRIDAY',
    type: 'percentage',
    value: 20,
    minPurchase: 50,
    maxDiscount: 30,
    active: true
  },
  {
    code: 'DESCONTO10',
    type: 'fixed',
    value: 10,
    minPurchase: 40,
    active: true
  }
]

export const useCouponStore = create<CouponState>((set, get) => ({
  appliedCoupon: null,

  applyCoupon: (code, cartTotal) => {
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active)

    if (!coupon) {
      return {
        success: false,
        message: 'Cupom inválido ou expirado'
      }
    }

    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      return {
        success: false,
        message: `Valor mínimo de compra para este cupom: R$ ${coupon.minPurchase.toFixed(2)}`
      }
    }

    set({ appliedCoupon: coupon })

    const discount = get().getDiscount(cartTotal)
    const discountValue = coupon.type === 'percentage' 
      ? `${coupon.value}%` 
      : `R$ ${coupon.value.toFixed(2)}`

    return {
      success: true,
      message: `Cupom aplicado! Desconto de ${discountValue} (R$ ${discount.amount.toFixed(2)})`,
      coupon
    }
  },

  removeCoupon: () => {
    set({ appliedCoupon: null })
  },

  getDiscount: (cartTotal) => {
    const { appliedCoupon } = get()

    if (!appliedCoupon) {
      return { percentage: 0, amount: 0 }
    }

    if (appliedCoupon.type === 'percentage') {
      let discount = cartTotal * (appliedCoupon.value / 100)
      
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount
      }

      return {
        percentage: appliedCoupon.value,
        amount: discount
      }
    }

    // Fixed discount
    return {
      percentage: 0,
      amount: Math.min(appliedCoupon.value, cartTotal)
    }
  }
}))


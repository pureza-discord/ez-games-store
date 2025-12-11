import { create } from 'zustand'
import { Product } from '@/data/products'

interface ConfirmState {
  isOpen: boolean
  title: string
  message: string
  product: Product | null
  onConfirm: (() => void) | null
  onCancel: (() => void) | null
  showConfirm: (title: string, message: string, product: Product, onConfirm: () => void, onCancel?: () => void) => void
  hideConfirm: () => void
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  title: '',
  message: '',
  product: null,
  onConfirm: null,
  onCancel: null,
  
  showConfirm: (title, message, product, onConfirm, onCancel) => {
    set({
      isOpen: true,
      title,
      message,
      product,
      onConfirm,
      onCancel: onCancel || null
    })
  },
  
  hideConfirm: () => {
    set({
      isOpen: false,
      title: '',
      message: '',
      product: null,
      onConfirm: null,
      onCancel: null
    })
  }
}))


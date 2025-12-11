import { create } from 'zustand'
import { Product } from '@/data/products'

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, force?: boolean) => { needsConfirm: boolean; message?: string }
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  getTotalWithDiscount: (discountPercent: number, discountAmount: number) => number
  checkIfInPack: (productId: string) => { isInPack: boolean; packName?: string }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product, force = false) => {
    const items = get().items
    const existingItem = items.find((item) => item.id === product.id)
    
    // Verificar se já existe no carrinho
    if (existingItem && !force) {
      return {
        needsConfirm: true,
        message: `${product.name} já está no carrinho. Deseja adicionar mais uma unidade?`
      }
    }
    
    // Verificar se o produto está em algum pacote já adicionado
    if (product.type === 'individual' && !force) {
      const packWithProduct = items.find(item => {
        if (item.type === 'pack' && item.games) {
          return item.games.some(game => 
            game.toLowerCase().includes(product.name.toLowerCase()) ||
            product.name.toLowerCase().includes(game.toLowerCase())
          )
        }
        return false
      })

      if (packWithProduct) {
        return {
          needsConfirm: true,
          message: `O pacote "${packWithProduct.name}" que você adicionou já contém "${product.name}". Você não precisa comprá-lo individualmente. Deseja adicionar mesmo assim?`
        }
      }
    }

    // Verificar se está adicionando um pacote quando já tem jogos individuais
    if (product.type === 'pack' && product.games && !force) {
      const individualGamesInCart = items.filter(item => {
        if (item.type === 'individual') {
          return product.games!.some(game =>
            game.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(game.toLowerCase())
          )
        }
        return false
      })

      if (individualGamesInCart.length > 0) {
        const gameNames = individualGamesInCart.map(g => g.name).join(', ')
        return {
          needsConfirm: true,
          message: `Você já tem no carrinho: ${gameNames}, que ${individualGamesInCart.length > 1 ? 'estão' : 'está'} incluído${individualGamesInCart.length > 1 ? 's' : ''} no pacote "${product.name}". Deseja adicionar o pacote mesmo assim?`
        }
      }
    }
    
    // Adicionar ou incrementar
    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({
        items: [...items, { ...product, quantity: 1 }],
      })
    }

    return { needsConfirm: false }
  },
  
  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.id !== productId),
    })
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })
  },
  
  clearCart: () => {
    set({ items: [] })
  },
  
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },

  getTotalWithDiscount: (discountPercent, discountAmount) => {
    const subtotal = get().getTotal()
    let total = subtotal
    
    if (discountPercent > 0) {
      total = subtotal * (1 - discountPercent / 100)
    }
    
    if (discountAmount > 0) {
      total = total - discountAmount
    }
    
    return Math.max(0, total)
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },

  checkIfInPack: (productId) => {
    const items = get().items
    const product = items.find(item => item.id === productId)
    
    if (!product || product.type !== 'individual') {
      return { isInPack: false }
    }

    const packWithProduct = items.find(item => {
      if (item.type === 'pack' && item.games) {
        return item.games.some(game => 
          game.toLowerCase().includes(product.name.toLowerCase())
        )
      }
      return false
    })

    if (packWithProduct) {
      return {
        isInPack: true,
        packName: packWithProduct.name
      }
    }

    return { isInPack: false }
  }
}))


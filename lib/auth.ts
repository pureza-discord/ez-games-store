import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  discordId?: string
  role: 'user' | 'admin'
  createdAt: string
  purchases: Purchase[]
}

export interface Purchase {
  id: string
  orderId: string
  amount: number
  items: Array<{id: string; name: string; price: number; quantity: number}>
  paymentMethod: 'pix' | 'card'
  status: 'pending' | 'approved' | 'cancelled'
  createdAt: string
  paidAt?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

// Usuários mockados (em produção viria do banco de dados)
const mockUsers = new Map<string, { password: string; user: User }>()

// Admin padrão
mockUsers.set('admin@ezgames.com', {
  password: 'admin123', // Em produção, seria hash
  user: {
    id: '1',
    email: 'admin@ezgames.com',
    name: 'Administrador',
    role: 'admin',
    createdAt: new Date().toISOString(),
    purchases: []
  }
})

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 500))

        const userData = mockUsers.get(email.toLowerCase())

        if (!userData || userData.password !== password) {
          return {
            success: false,
            message: 'Email ou senha incorretos'
          }
        }

        set({ 
          user: userData.user, 
          isAuthenticated: true 
        })

        return {
          success: true,
          message: 'Login realizado com sucesso!'
        }
      },

      register: async (email, password, name) => {
        await new Promise(resolve => setTimeout(resolve, 500))

        if (mockUsers.has(email.toLowerCase())) {
          return {
            success: false,
            message: 'Este email já está cadastrado'
          }
        }

        if (password.length < 6) {
          return {
            success: false,
            message: 'A senha deve ter no mínimo 6 caracteres'
          }
        }

        const newUser: User = {
          id: Date.now().toString(),
          email: email.toLowerCase(),
          name,
          role: 'user',
          createdAt: new Date().toISOString(),
          purchases: []
        }

        mockUsers.set(email.toLowerCase(), {
          password,
          user: newUser
        })

        set({ 
          user: newUser, 
          isAuthenticated: true 
        })

        return {
          success: true,
          message: 'Cadastro realizado com sucesso!'
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)

